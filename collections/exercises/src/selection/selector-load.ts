import { getEsoDayStr, getEsoDayStrOffset } from "@shared/recurrence/reset-times"
import { getPages } from "../pages/access"
import { fieldBool, fieldNum, fieldStr } from "../cli/lib/fields"
import { resolveActiveSchedule } from "../cli/lib/resolve"
import { computeCoverage, type WeekMovement } from "./coverage"
import { isInKit, kitCategoryFor } from "./equipment-kit"
import { movementFeaturesFromPage } from "./movement-features"
import type { SelectionPolicy } from "./policy"
import { scoreMovement } from "./scorer"
import type { SelectorInputs } from "./selector"
import type { ScoredCandidate } from "./anchor"
import { DAYS_OF_WEEK, dayOfWeekFromDayStr } from "../tracking/day-of-week"
import type { SetLine } from "../tracking/history-core"

const MS_PER_DAY = 86_400_000
const CATALOG_READ_LIMIT = 2000
const SETLOG_READ_LIMIT = 5000
const HISTORY_WINDOW_DAYS = 56

const CATALOG_SELECT = [
  "id",
  "slug",
  "title",
  "category",
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

const MS_NOON = 12 * 60 * 60 * 1000

function daySeedFromDayStr(dayStr: string): number {
  const [y, m, d] = dayStr.split("-").map(Number)
  if (y === undefined || m === undefined || d === undefined) return 0
  return Math.floor((Date.UTC(y, m - 1, d) + MS_NOON) / MS_PER_DAY)
}

async function resolveFocus(
  focusArg: string | undefined,
  dayStr: string
): Promise<string | null> {
  if (focusArg !== undefined) return focusArg
  const schedule = await resolveActiveSchedule()
  if (schedule === null || schedule.slug === null) return null
  const day = await getPages({
    pageTypeSlug: "schedule-day",
    where: [
      { key: "scheduleSlug", eq: schedule.slug },
      { key: "dayOfWeek", eq: dayOfWeekFromDayStr(dayStr) },
    ],
    select: ["focus"],
    limit: 1,
  })
  const scheduled = day.rows[0] !== undefined ? fieldStr(day.rows[0], "focus") : undefined
  return scheduled !== undefined && scheduled !== "rest" ? scheduled : null
}

interface EquipmentKit {
  readonly inKit: (equipment: string | null) => boolean
  readonly ladderFor: (equipment: string | null) => readonly number[]
}

function parseLadder(raw: string | undefined): readonly number[] {
  if (raw === undefined) return []
  return raw
    .split(",")
    .map((s) => Number(s.trim()))
    .filter((n) => Number.isFinite(n) && n > 0)
    .sort((a, b) => a - b)
}

async function loadEquipmentKit(): Promise<EquipmentKit> {
  const rows = await getPages({
    pageTypeSlug: "equipment-item",
    select: ["id", "category", "loads", "available"],
    limit: 200,
  })
  const laddersByCategory = new Map<string, readonly number[]>()
  const availableCategories = new Set<string>()
  for (const row of rows.rows) {
    if (fieldBool(row, "available") === false) continue
    const category = fieldStr(row, "category")
    if (category === undefined) continue
    availableCategories.add(category)
    const ladder = parseLadder(fieldStr(row, "loads"))
    if (ladder.length > 0) laddersByCategory.set(category, ladder)
  }
  return {
    inKit: (equipment) => isInKit(equipment, availableCategories),
    ladderFor: (equipment) => {
      const category = kitCategoryFor(equipment)
      return category !== null ? (laddersByCategory.get(category) ?? []) : []
    },
  }
}

interface RawSet {
  readonly exerciseSlug: string
  readonly sessionSlug: string | null
  readonly dayStr: string | null
  readonly line: SetLine
  readonly activityType: string | null
}

interface ExerciseHistory {
  readonly sessionsInWindow: number
  readonly lastDayStr: string | null
  readonly priorDayStr: string | null
  readonly lastSessionSets: readonly SetLine[]
  readonly improvingRecently: boolean
}

function setScore(line: SetLine): number {
  return (line.weight ?? 0) * 1000 + (line.reps ?? 0)
}

function sessionBest(lines: readonly SetLine[]): number {
  return lines.reduce((max, l) => Math.max(max, setScore(l)), 0)
}

function summarize(
  rawSets: readonly RawSet[],
  windowStartDay: string,
  todayDayStr: string
): ExerciseHistory {
  const strength = rawSets.filter(
    (r) => r.activityType !== "cardio" && r.activityType !== "mobility" && r.line.isWarmup !== true
  )
  if (strength.length === 0) {
    return {
      sessionsInWindow: 0,
      lastDayStr: null,
      priorDayStr: null,
      lastSessionSets: [],
      improvingRecently: true,
    }
  }
  const byDay = new Map<string, SetLine[]>()
  for (const r of strength) {
    const key = r.dayStr ?? ""
    const list = byDay.get(key) ?? []
    list.push(r.line)
    byDay.set(key, list)
  }
  const days = [...byDay.keys()].filter((d) => d !== "").sort((a, b) => (a < b ? 1 : -1))
  const lastDayStr = days[0] ?? null
  const priorDayStr = days.find((d) => d < todayDayStr) ?? null
  const lastSessionSets = lastDayStr !== null ? (byDay.get(lastDayStr) ?? []) : []
  const windowDays = days.filter((d) => d >= windowStartDay)
  const sessionsInWindow = windowDays.length
  let improvingRecently = true
  if (windowDays.length >= 3 && lastDayStr !== null) {
    const latestBest = sessionBest(lastSessionSets)
    const priorBest = windowDays
      .slice(1)
      .reduce((max, d) => Math.max(max, sessionBest(byDay.get(d) ?? [])), 0)
    improvingRecently = latestBest > priorBest
  }
  return { sessionsInWindow, lastDayStr, priorDayStr, lastSessionSets, improvingRecently }
}

interface HistoryData {
  readonly everLogged: ReadonlySet<string>
  readonly byExercise: ReadonlyMap<string, ExerciseHistory>
  readonly week: readonly RawSet[]
}

async function loadHistory(
  windowStartDay: string,
  weekStartDay: string,
  todayDayStr: string
): Promise<HistoryData> {
  const logs = await getPages({
    pageTypeSlug: "set-log",
    order: [
      { by: "loggedAt", dir: "desc" },
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
    limit: SETLOG_READ_LIMIT,
  })
  const sessionSlugs = [
    ...new Set(
      logs.rows.map((r) => fieldStr(r, "sessionSlug")).filter((s): s is string => s !== undefined)
    ),
  ]
  const dateBySession = new Map<string, string>()
  if (sessionSlugs.length > 0) {
    const sessions = await getPages({
      pageTypeSlug: "workout-session",
      where: [{ key: "slug", in: sessionSlugs }],
      select: ["id", "slug", "date"],
      limit: sessionSlugs.length,
    })
    for (const row of sessions.rows) {
      const date = fieldStr(row, "date")
      if (date !== undefined && row.slug !== null) dateBySession.set(row.slug, date)
    }
  }
  const everLogged = new Set<string>()
  const rawByExercise = new Map<string, RawSet[]>()
  const week: RawSet[] = []
  for (const row of logs.rows) {
    const exerciseSlug = fieldStr(row, "exerciseSlug")
    if (exerciseSlug === undefined) continue
    everLogged.add(exerciseSlug)
    const sessionSlug = fieldStr(row, "sessionSlug") ?? null
    const dayStr = sessionSlug !== null ? (dateBySession.get(sessionSlug) ?? null) : null
    const raw: RawSet = {
      exerciseSlug,
      sessionSlug,
      dayStr,
      activityType: fieldStr(row, "activityType") ?? null,
      line: {
        date: dayStr,
        setNumber: fieldNum(row, "setNumber") ?? null,
        reps: fieldNum(row, "reps") ?? null,
        weight: fieldNum(row, "weight") ?? null,
        rpe: fieldNum(row, "rpe") ?? null,
        isWarmup: fieldBool(row, "isWarmup"),
      },
    }
    const list = rawByExercise.get(exerciseSlug) ?? []
    list.push(raw)
    rawByExercise.set(exerciseSlug, list)
    if (dayStr !== null && dayStr >= weekStartDay) week.push(raw)
  }
  const byExercise = new Map<string, ExerciseHistory>()
  for (const [exerciseSlug, rawSets] of rawByExercise) {
    byExercise.set(exerciseSlug, summarize(rawSets, windowStartDay, todayDayStr))
  }
  return { everLogged, byExercise, week }
}

export interface LoadSelectorResult {
  readonly focus: string | null
  readonly dayStr: string
  readonly inputs: SelectorInputs | null
}

export async function loadSelectorInputs(
  focusArg: string | undefined,
  now: Date,
  policy: SelectionPolicy
): Promise<LoadSelectorResult> {
  const dayStr = getEsoDayStr(now)
  const focus = await resolveFocus(focusArg, dayStr)
  if (focus === null) return { focus: null, dayStr, inputs: null }

  const weekdayIndex = DAYS_OF_WEEK.indexOf(dayOfWeekFromDayStr(dayStr))
  const weekStartDay = getEsoDayStrOffset(now, -weekdayIndex)
  const windowStartDay = getEsoDayStrOffset(now, -HISTORY_WINDOW_DAYS)

  const [kit, catalog, history] = await Promise.all([
    loadEquipmentKit(),
    getPages({ pageTypeSlug: "exercise", select: CATALOG_SELECT, limit: CATALOG_READ_LIMIT }),
    loadHistory(windowStartDay, weekStartDay, dayStr),
  ])

  const patternBySlug = new Map<string, { pattern: string; laterality: string }>()
  for (const page of catalog.rows) {
    if (page.slug === null) continue
    patternBySlug.set(page.slug, {
      pattern: fieldStr(page, "movementPattern") ?? "isolation-other",
      laterality: fieldStr(page, "laterality") ?? "bilateral",
    })
  }

  const loggedPatterns = new Set<string>()
  for (const exerciseSlug of history.everLogged) {
    const p = patternBySlug.get(exerciseSlug)
    if (p !== undefined) loggedPatterns.add(p.pattern)
  }

  const sessionPerformed = new Set(
    history.week.filter((raw) => raw.dayStr === dayStr).map((raw) => raw.exerciseSlug)
  )

  const weekMovements: WeekMovement[] = []
  for (const raw of history.week) {
    const p = patternBySlug.get(raw.exerciseSlug)
    if (p !== undefined)
      weekMovements.push({ movementPattern: p.pattern, laterality: p.laterality })
  }
  const coverage = computeCoverage(weekMovements)

  const candidates: ScoredCandidate[] = []
  for (const page of catalog.rows) {
    if (page.slug === null) continue
    const equipment = fieldStr(page, "equipment") ?? null
    if (!kit.inKit(equipment)) continue
    const scores = scoreMovement(movementFeaturesFromPage(page), policy.weights)
    const hist = history.byExercise.get(page.slug)
    candidates.push({
      id: page.slug,
      name: page.title ?? page.slug,
      movementPattern: fieldStr(page, "movementPattern") ?? "isolation-other",
      secondaryPattern: fieldStr(page, "secondaryPattern") ?? null,
      muscleFocus: fieldStr(page, "muscleFocus") ?? "other",
      laterality: fieldStr(page, "laterality") ?? "bilateral",
      skillCost: fieldStr(page, "skillCost") ?? "moderate",
      isBallistic: fieldBool(page, "isBallistic") ?? false,
      equipment,
      scores,
      loadsLadder: kit.ladderFor(equipment),
      lastSessionSets: hist?.lastSessionSets ?? [],
      logged: history.everLogged.has(page.slug),
      sessionsLogged: hist?.sessionsInWindow ?? 0,
      lastDayStr: hist?.lastDayStr ?? null,
      priorDayStr: hist?.priorDayStr ?? null,
      improvingRecently: hist?.improvingRecently ?? true,
    })
  }

  return {
    focus,
    dayStr,
    inputs: {
      focus,
      dayStr,
      daySeed: daySeedFromDayStr(dayStr),
      policy,
      candidates,
      coverage,
      loggedPatterns,
      sessionPerformed,
    },
  }
}
