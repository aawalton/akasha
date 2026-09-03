import { MS_PER_DAY, NOON, parseDay } from "@akasha/day/day-string"
import { getEsoDayStr, getEsoDayStrOffset } from "@akasha/day/eso-day"
import type { SelectionPolicy } from "@akasha/exercise-access/selection-policy"
import { getPages } from "@akasha/pages-access/get"
import type { Page } from "@akasha/pages-core/page-types"
import type { EquipmentCategory } from "../../equipment-items/properties/equipment-category.select-property.ts"
import type { Equipment } from "../../exercises/properties/equipment.select-property.ts"
import type { Laterality } from "../../exercises/properties/laterality.select-property.ts"
import type { MovementPattern } from "../../exercises/properties/movement-pattern.select-property.ts"
import type { DayOfWeek } from "../../schedule-days/properties/day-of-week.select-property.ts"
import type { ExerciseSlug } from "../../set-logs/properties/exercise-slug.relation-property.ts"
import { isInKit, kitCategoryFor } from "../equipment-kit/equipment-kit.module.code.ts"
import {
  type MovementFeatures,
  scoreMovement,
} from "../movement-scoring/movement-scoring.module.code.ts"
import type { PerformedSet } from "../performed-set/performed-set.module.code.ts"
import type { ScoredCandidate } from "../session-anchor/session-anchor.module.code.ts"
import type { SelectorInputs } from "../session-selection/session-selection.module.code.ts"
import {
  computeCoverage,
  type WeekMovement,
} from "../weekly-coverage/weekly-coverage.module.code.ts"

const CATALOG_READ_LIMIT = 2000
const SET_LOG_READ_LIMIT = 5000
const HISTORY_WINDOW_DAYS = 56
const IMPROVEMENT_SESSIONS_NEEDED = 3

const DEFAULT_PATTERN: MovementPattern = "isolation-other"
const DEFAULT_LATERALITY: Laterality = "bilateral"

const CATALOG_SELECT = [
  "id",
  "slug",
  "title",
  "exerciseCategory",
  "mechanic",
  "equipment",
  "primaryMuscles",
  "secondaryMuscles",
  "movementPattern",
  "secondaryPattern",
  "laterality",
  "isBallistic",
  "skillCost",
  "trainsLengthenedRange",
  "gripDemand",
  "sfrScore",
  "muscleFocus",
]

const WEEKDAY_BY_UTC_DAY: readonly DayOfWeek[] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
]

function textAt(page: Page, key: string): string | undefined {
  const held = page[key]
  return typeof held === "string" ? held : undefined
}

function numberAt(page: Page, key: string): number | undefined {
  const held = page[key]
  return typeof held === "number" ? held : undefined
}

function flagAt(page: Page, key: string): boolean | undefined {
  const held = page[key]
  return typeof held === "boolean" ? held : undefined
}

function textsAt(page: Page, key: string): readonly string[] {
  const held = page[key]
  if (!Array.isArray(held)) return []
  return held.filter((one): one is string => typeof one === "string")
}

function numbersAt(page: Page, key: string): readonly number[] {
  const held = page[key]
  if (!Array.isArray(held)) return []
  return held.filter((one): one is number => typeof one === "number").sort((a, b) => a - b)
}

function dayOfWeekOf(dayStr: string): DayOfWeek {
  const parsed = parseDay(dayStr)
  if (parsed === null) throw new Error(`\`${dayStr}\` is no day, so no day of the week is it`)
  const [year, month, day] = parsed
  const weekday = new Date(Date.UTC(year, month - 1, day, NOON, 0, 0, 0)).getUTCDay()
  const named = WEEKDAY_BY_UTC_DAY[weekday]
  if (named === undefined) throw new Error(`the day of the week came back as ${weekday}`)
  return named
}

function daySeedOf(dayStr: string): number {
  const parsed = parseDay(dayStr)
  if (parsed === null) return 0
  const [year, month, day] = parsed
  return Math.floor(Date.UTC(year, month - 1, day, NOON, 0, 0, 0) / MS_PER_DAY)
}

async function resolveFocus(
  focusAsked: string | undefined,
  dayStr: string
): Promise<string | null> {
  if (focusAsked !== undefined) return focusAsked
  const schedules = await getPages({
    pageTypeSlug: "workout-schedule",
    where: [{ key: "workoutScheduleActive", eq: true }],
    select: ["id", "slug"],
    limit: 2,
  })
  const active = schedules.rows[0]
  if (active === undefined || active.slug === null) return null
  const days = await getPages({
    pageTypeSlug: "schedule-day",
    where: [
      { key: "scheduleSlug", eq: active.slug },
      { key: "dayOfWeek", eq: dayOfWeekOf(dayStr) },
    ],
    select: ["focus"],
    limit: 1,
  })
  const scheduled = days.rows[0] === undefined ? undefined : textAt(days.rows[0], "focus")
  return scheduled !== undefined && scheduled !== "rest" ? scheduled : null
}

type EquipmentKit = {
  readonly inKit: (equipment: Equipment | null) => boolean
  readonly ladderFor: (equipment: Equipment | null) => readonly number[]
}

async function loadEquipmentKit(): Promise<EquipmentKit> {
  const items = await getPages({
    pageTypeSlug: "equipment-item",
    select: ["id", "category", "loads", "available"],
    limit: 200,
  })
  const laddersByCategory = new Map<EquipmentCategory, readonly number[]>()
  const availableCategories = new Set<EquipmentCategory>()
  for (const item of items.rows) {
    if (flagAt(item, "available") === false) continue
    const category = textAt(item, "category") as EquipmentCategory | undefined
    if (category === undefined) continue
    availableCategories.add(category)
    const ladder = numbersAt(item, "loads")
    if (ladder.length > 0) laddersByCategory.set(category, ladder)
  }
  return {
    inKit: (equipment) => isInKit(equipment, availableCategories),
    ladderFor: (equipment) => {
      const category = kitCategoryFor(equipment)
      return category === null ? [] : (laddersByCategory.get(category) ?? [])
    },
  }
}

type LoggedSet = {
  readonly exerciseSlug: ExerciseSlug
  readonly dayStr: string | null
  readonly activityType: string | null
  readonly line: PerformedSet
}

type ExerciseHistory = {
  readonly sessionsInWindow: number
  readonly lastDayStr: string | null
  readonly priorDayStr: string | null
  readonly lastSessionSets: readonly PerformedSet[]
  readonly improvingRecently: boolean
}

const NO_HISTORY: ExerciseHistory = {
  sessionsInWindow: 0,
  lastDayStr: null,
  priorDayStr: null,
  lastSessionSets: [],
  improvingRecently: true,
}

function setReach(line: PerformedSet): number {
  return (line.weight ?? 0) * 1000 + (line.reps ?? 0)
}

function sessionBest(lines: readonly PerformedSet[]): number {
  return lines.reduce((best, line) => Math.max(best, setReach(line)), 0)
}

function summarize(
  logged: readonly LoggedSet[],
  windowStartDay: string,
  todayDayStr: string
): ExerciseHistory {
  const strength = logged.filter(
    (one) => one.activityType !== "cardio" && one.activityType !== "mobility" && !one.line.isWarmup
  )
  if (strength.length === 0) return NO_HISTORY

  const byDay = new Map<string, PerformedSet[]>()
  for (const one of strength) {
    if (one.dayStr === null) continue
    const held = byDay.get(one.dayStr) ?? []
    held.push(one.line)
    byDay.set(one.dayStr, held)
  }
  const days = [...byDay.keys()].sort((a, b) => (a < b ? 1 : -1))
  const lastDayStr = days[0] ?? null
  const priorDayStr = days.find((day) => day < todayDayStr) ?? null
  const lastSessionSets = lastDayStr === null ? [] : (byDay.get(lastDayStr) ?? [])
  const windowDays = days.filter((day) => day >= windowStartDay)

  let improvingRecently = true
  if (windowDays.length >= IMPROVEMENT_SESSIONS_NEEDED && lastDayStr !== null) {
    const latestBest = sessionBest(lastSessionSets)
    const priorBest = windowDays
      .slice(1)
      .reduce((best, day) => Math.max(best, sessionBest(byDay.get(day) ?? [])), 0)
    improvingRecently = latestBest > priorBest
  }
  return {
    sessionsInWindow: windowDays.length,
    lastDayStr,
    priorDayStr,
    lastSessionSets,
    improvingRecently,
  }
}

type HistoryData = {
  readonly everLogged: ReadonlySet<ExerciseSlug>
  readonly byExercise: ReadonlyMap<ExerciseSlug, ExerciseHistory>
  readonly week: readonly LoggedSet[]
}

async function loadHistory(
  windowStartDay: string,
  weekStartDay: string,
  todayDayStr: string
): Promise<HistoryData> {
  const logs = await getPages({
    pageTypeSlug: "set-log",
    order: [
      { by: "seq", dir: "desc" },
      { by: "id", dir: "desc" },
    ],
    select: [
      "id",
      "sessionSlug",
      "exerciseSlug",
      "setNumber",
      "reps",
      "weight",
      "rpe",
      "isWarmup",
      "activityType",
    ],
    limit: SET_LOG_READ_LIMIT,
  })

  const sessionSlugs = [
    ...new Set(
      logs.rows
        .map((row) => textAt(row, "sessionSlug"))
        .filter((slug): slug is string => slug !== undefined)
    ),
  ]
  const dayBySession = new Map<string, string>()
  if (sessionSlugs.length > 0) {
    const sessions = await getPages({
      pageTypeSlug: "workout-session",
      where: [{ key: "slug", in: sessionSlugs }],
      select: ["id", "slug", "workoutSessionDate"],
      limit: sessionSlugs.length,
    })
    for (const session of sessions.rows) {
      const day = textAt(session, "workoutSessionDate")
      if (day !== undefined && session.slug !== null) dayBySession.set(session.slug, day)
    }
  }

  const everLogged = new Set<ExerciseSlug>()
  const loggedByExercise = new Map<ExerciseSlug, LoggedSet[]>()
  const week: LoggedSet[] = []
  for (const row of logs.rows) {
    const exerciseSlug = textAt(row, "exerciseSlug")
    if (exerciseSlug === undefined) continue
    everLogged.add(exerciseSlug)
    const sessionSlug = textAt(row, "sessionSlug")
    const dayStr = sessionSlug === undefined ? null : (dayBySession.get(sessionSlug) ?? null)
    const one: LoggedSet = {
      exerciseSlug,
      dayStr,
      activityType: textAt(row, "activityType") ?? null,
      line: {
        day: dayStr,
        setNumber: numberAt(row, "setNumber") ?? null,
        reps: numberAt(row, "reps") ?? null,
        weight: numberAt(row, "weight") ?? null,
        rpe: numberAt(row, "rpe") ?? null,
        isWarmup: flagAt(row, "isWarmup") ?? false,
      },
    }
    const held = loggedByExercise.get(exerciseSlug) ?? []
    held.push(one)
    loggedByExercise.set(exerciseSlug, held)
    if (dayStr !== null && dayStr >= weekStartDay) week.push(one)
  }

  const byExercise = new Map<ExerciseSlug, ExerciseHistory>()
  for (const [exerciseSlug, sets] of loggedByExercise) {
    byExercise.set(exerciseSlug, summarize(sets, windowStartDay, todayDayStr))
  }
  return { everLogged, byExercise, week }
}

function featuresOf(page: Page): MovementFeatures {
  return {
    movementPattern: (textAt(page, "movementPattern") ?? DEFAULT_PATTERN) as MovementPattern,
    secondaryPattern: textAt(page, "secondaryPattern") as MovementFeatures["secondaryPattern"],
    laterality: (textAt(page, "laterality") ?? DEFAULT_LATERALITY) as Laterality,
    isBallistic: flagAt(page, "isBallistic") ?? false,
    skillCost: (textAt(page, "skillCost") ?? "moderate") as MovementFeatures["skillCost"],
    trainsLengthenedRange: flagAt(page, "trainsLengthenedRange") ?? false,
    gripDemand: (textAt(page, "gripDemand") ?? "none") as MovementFeatures["gripDemand"],
    sfrScore: numberAt(page, "sfrScore") ?? 0,
    exerciseCategory: textAt(page, "exerciseCategory") as MovementFeatures["exerciseCategory"],
    mechanic: textAt(page, "mechanic") as MovementFeatures["mechanic"],
    primaryMuscles: textsAt(page, "primaryMuscles") as MovementFeatures["primaryMuscles"],
    secondaryMuscles: textsAt(page, "secondaryMuscles") as MovementFeatures["secondaryMuscles"],
  }
}

export type LoadSelectorResult = {
  readonly focus: string | null
  readonly dayStr: string
  readonly inputs: SelectorInputs | null
}

export async function loadSelectorInputs(
  focusAsked: string | undefined,
  now: Date,
  policy: SelectionPolicy
): Promise<LoadSelectorResult> {
  const dayStr = getEsoDayStr(now)
  const focus = await resolveFocus(focusAsked, dayStr)
  if (focus === null) return { focus: null, dayStr, inputs: null }

  const weekdayIndex = WEEKDAY_BY_UTC_DAY.indexOf(dayOfWeekOf(dayStr))
  const weekStartDay = getEsoDayStrOffset(now, -weekdayIndex)
  const windowStartDay = getEsoDayStrOffset(now, -HISTORY_WINDOW_DAYS)

  const [kit, catalog, history] = await Promise.all([
    loadEquipmentKit(),
    getPages({ pageTypeSlug: "exercise", select: CATALOG_SELECT, limit: CATALOG_READ_LIMIT }),
    loadHistory(windowStartDay, weekStartDay, dayStr),
  ])

  const movementBySlug = new Map<ExerciseSlug, WeekMovement>()
  for (const page of catalog.rows) {
    if (page.slug === null) continue
    movementBySlug.set(page.slug, {
      movementPattern: (textAt(page, "movementPattern") ?? DEFAULT_PATTERN) as MovementPattern,
      laterality: (textAt(page, "laterality") ?? DEFAULT_LATERALITY) as Laterality,
    })
  }

  const loggedPatterns = new Set<MovementPattern>()
  for (const exerciseSlug of history.everLogged) {
    const movement = movementBySlug.get(exerciseSlug)
    if (movement !== undefined) loggedPatterns.add(movement.movementPattern)
  }

  const sessionPerformed = new Set<ExerciseSlug>(
    history.week.filter((one) => one.dayStr === dayStr).map((one) => one.exerciseSlug)
  )

  const weekMovements: WeekMovement[] = []
  for (const one of history.week) {
    const movement = movementBySlug.get(one.exerciseSlug)
    if (movement !== undefined) weekMovements.push(movement)
  }

  const candidates: ScoredCandidate[] = []
  for (const page of catalog.rows) {
    if (page.slug === null) continue
    const equipment = (textAt(page, "equipment") ?? null) as Equipment | null
    if (!kit.inKit(equipment)) continue
    const features = featuresOf(page)
    const history_ = history.byExercise.get(page.slug) ?? NO_HISTORY
    candidates.push({
      exerciseSlug: page.slug,
      title: page.title ?? page.slug,
      movementPattern: features.movementPattern,
      secondaryPattern: features.secondaryPattern ?? null,
      muscleFocus: (textAt(page, "muscleFocus") ?? "other") as ScoredCandidate["muscleFocus"],
      laterality: features.laterality,
      skillCost: features.skillCost,
      isBallistic: features.isBallistic,
      equipment,
      scores: scoreMovement(features, policy.weights),
      loadsLadder: kit.ladderFor(equipment),
      lastSessionSets: history_.lastSessionSets,
      logged: history.everLogged.has(page.slug),
      sessionsLogged: history_.sessionsInWindow,
      lastDayStr: history_.lastDayStr,
      priorDayStr: history_.priorDayStr,
      improvingRecently: history_.improvingRecently,
    })
  }

  return {
    focus,
    dayStr,
    inputs: {
      focus,
      dayStr,
      daySeed: daySeedOf(dayStr),
      policy,
      candidates,
      coverage: computeCoverage(weekMovements),
      loggedPatterns,
      sessionPerformed,
    },
  }
}
