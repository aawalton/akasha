import { askComposed } from "@shared/pages-query/ask"
import { getEsoDayStr } from "@shared/recurrence/reset-times"
import { getPages, pageOfRow } from "../pages/access"
import type { Page } from "../pages/page"
import { fieldBool, fieldNum, fieldStr } from "../cli/lib/fields"
import { resolveActiveSchedule } from "../cli/lib/resolve"
import { dayOfWeekFromDayStr } from "./day-of-week"
import { loadSessionVolume } from "./day-volume"
import { bestSet, lastWorkingSet, type SetLine } from "./history-core"
import {
  type DigestConstraint,
  type DigestEquipment,
  type DigestFocusRecency,
  type DigestMobility,
  type DigestMovement,
  type DigestResult,
  type DigestSession,
  mobilityTrend,
  progressionTarget,
} from "./digest-model"


const RECENT_FOCUS_SESSIONS = 6
const MOVEMENT_SOURCE_SESSIONS = 3
const PER_MOVEMENT_SET_WINDOW = 30

function focusTagsOf(row: Page): readonly string[] {
  const raw = row.focusTags
  if (!Array.isArray(raw)) return []
  return raw.filter((v): v is string => typeof v === "string")
}

async function scheduleDaySlugsForFocus(
  scheduleSlug: string,
  focus: string
): Promise<readonly string[]> {
  const asked = await askComposed({
    "page-type": "schedule-day",
    where: { "schedule-slug": { is: scheduleSlug }, focus: { is: focus } },
    keys: ["id", "slug"],
  })
  if (!asked.ok)
    throw new Error(`scheduleDaySlugsForFocus(${scheduleSlug}, ${focus}): ${asked.why}`)
  return asked.answer.rows
    .map((row) => row.values.slug)
    .filter((slug): slug is string => typeof slug === "string")
}

async function recentSessionsForFocus(
  scheduleSlug: string,
  focus: string
): Promise<readonly Page[]> {
  const daySlugs = await scheduleDaySlugsForFocus(scheduleSlug, focus)
  if (daySlugs.length === 0) return []
  const asked = await askComposed({
    "page-type": "workout-session",
    where: { "schedule-day-slug": { in: daySlugs } },
    "sort-by": "date",
    descending: true,
    limit: RECENT_FOCUS_SESSIONS,
  })
  if (!asked.ok) throw new Error(`recentSessionsForFocus(${scheduleSlug}, ${focus}): ${asked.why}`)
  return asked.answer.rows.map((row) => pageOfRow(row.values))
}

async function exerciseTitles(
  slugs: readonly string[]
): Promise<Map<string, string>> {
  const out = new Map<string, string>()
  if (slugs.length === 0) return out
  const asked = await askComposed({
    "page-type": "exercise",
    where: { slug: { in: slugs } },
    keys: ["id", "slug", "title"],
  })
  if (!asked.ok) throw new Error(`exerciseTitles: ${asked.why}`)
  for (const row of asked.answer.rows) {
    const slug = row.values.slug
    if (typeof slug !== "string") continue
    const title = row.values.title
    out.set(slug, typeof title === "string" ? title : slug)
  }
  return out
}

async function setLinesForExercise(exerciseSlug: string): Promise<SetLine[]> {
  const logs = await getPages({
    pageTypeSlug: "set-log",
    where: [{ key: "exerciseSlug", eq: exerciseSlug }],
    order: [
      { by: "loggedAt", dir: "desc" },
      { by: "id", dir: "desc" },
    ],
    limit: PER_MOVEMENT_SET_WINDOW,
  })
  const sessionSlugs = [
    ...new Set(logs.rows.map((r) => fieldStr(r, "sessionSlug")).filter((s) => s !== undefined)),
  ]
  const dateBySession = new Map<string, string>()
  if (sessionSlugs.length > 0) {
    const sessions = await getPages({
      pageTypeSlug: "workout-session",
      where: [{ key: "slug", in: sessionSlugs }],
      select: ["id", "slug", "date"],
    })
    for (const row of sessions.rows) {
      const date = fieldStr(row, "date")
      if (date !== undefined && row.slug !== null) dateBySession.set(row.slug, date)
    }
  }
  return logs.rows.map((row) => {
    const sessionSlug = fieldStr(row, "sessionSlug")
    return {
      date: sessionSlug !== undefined ? (dateBySession.get(sessionSlug) ?? null) : null,
      setNumber: fieldNum(row, "setNumber") ?? null,
      reps: fieldNum(row, "reps") ?? null,
      weight: fieldNum(row, "weight") ?? null,
      rpe: fieldNum(row, "rpe") ?? null,
      isWarmup: fieldBool(row, "isWarmup"),
    }
  })
}

async function distinctExercisesInSessions(
  sessions: readonly Page[]
): Promise<readonly string[]> {
  const sessionSlugs = sessions
    .slice(0, MOVEMENT_SOURCE_SESSIONS)
    .map((s) => s.slug)
    .filter((slug): slug is string => slug !== null)
  if (sessionSlugs.length === 0) return []
  const asked = await askComposed({
    "page-type": "set-log",
    where: { "session-slug": { in: sessionSlugs } },
    keys: ["id", "exercise-slug"],
  })
  if (!asked.ok) throw new Error(`distinctExercisesInSessions: ${asked.why}`)
  const seen: string[] = []
  for (const row of asked.answer.rows) {
    const slug = row.values["exercise-slug"]
    if (typeof slug === "string" && !seen.includes(slug)) seen.push(slug)
  }
  return seen
}

async function buildLastSession(
  session: Page | undefined,
  bodyweight: number
): Promise<DigestSession | null> {
  if (session === undefined || session.slug === null) return null
  const asked = await askComposed({
    "page-type": "set-log",
    where: { "session-slug": { is: session.slug } },
    keys: ["id", "exercise-slug"],
  })
  if (!asked.ok) throw new Error(`buildLastSession(${session.slug}): ${asked.why}`)
  const exSlugs = [
    ...new Set(
      asked.answer.rows
        .map((r) => r.values["exercise-slug"])
        .filter((s): s is string => typeof s === "string")
    ),
  ]
  const titles = await exerciseTitles(exSlugs)
  const totalVolume = await loadSessionVolume(session.slug, bodyweight)
  return {
    id: session.id,
    date: fieldStr(session, "date") ?? null,
    totalVolume,
    movements: exSlugs.map((slug) => titles.get(slug) ?? slug),
  }
}

async function loadMobility(): Promise<readonly DigestMobility[]> {
  const asked = await askComposed({
    "page-type": "mobility-reading",
    "sort-by": "date",
    limit: 500,
  })
  if (!asked.ok) throw new Error(`loadMobility: ${asked.why}`)
  const readings = { rows: asked.answer.rows.map((row) => pageOfRow(row.values)) }
  const groups = new Map<string, { rows: Page[]; metric: string; side: string | null }>()
  for (const row of readings.rows) {
    const metric = fieldStr(row, "metric")
    if (metric === undefined) continue
    const side = fieldStr(row, "side") ?? null
    const key = `${metric}::${side ?? ""}`
    const group = groups.get(key) ?? { rows: [], metric, side }
    group.rows.push(row)
    groups.set(key, group)
  }
  const out: DigestMobility[] = []
  for (const { rows, metric, side } of groups.values()) {
    const latest = rows[rows.length - 1]
    const nums = rows
      .map((r) => fieldNum(r, "valueNum"))
      .filter((n): n is number => n !== undefined)
    out.push({
      metric,
      side: side === "n-a" ? null : side,
      latestText: latest !== undefined ? (fieldStr(latest, "valueText") ?? null) : null,
      latestNum: latest !== undefined ? (fieldNum(latest, "valueNum") ?? null) : null,
      date: latest !== undefined ? (fieldStr(latest, "date") ?? null) : null,
      readingCount: rows.length,
      trend: mobilityTrend(nums),
    })
  }
  return out
}

async function loadConstraints(
  focus: string | null
): Promise<readonly DigestConstraint[]> {
  const asked = await askComposed({
    "page-type": "coaching-constraint",
    where: { active: { is: true } },
    "sort-by": "sort-order",
    limit: 200,
  })
  if (!asked.ok) throw new Error(`loadConstraints: ${asked.why}`)
  const rows = { rows: asked.answer.rows.map((row) => pageOfRow(row.values)) }
  const matches = rows.rows.filter((row) => {
    if (focus === null) return true
    const tags = focusTagsOf(row)
    return tags.includes(focus) || tags.includes("all")
  })
  return matches.map((row) => ({
    title: row.title ?? row.id,
    kind: fieldStr(row, "kind") ?? null,
    body: fieldStr(row, "body") ?? null,
    focusTags: focusTagsOf(row),
  }))
}

async function loadEquipment(): Promise<readonly DigestEquipment[]> {
  const asked = await askComposed({
    "page-type": "equipment-item",
    "sort-by": "sort-order",
    limit: 200,
  })
  if (!asked.ok) throw new Error(`loadEquipment: ${asked.why}`)
  const rows = { rows: asked.answer.rows.map((row) => pageOfRow(row.values)) }
  return rows.rows.map((row) => ({
    title: row.title ?? row.id,
    category: fieldStr(row, "category") ?? null,
    configuration: fieldStr(row, "configuration") ?? null,
    loads: fieldStr(row, "loads") ?? null,
    available: fieldBool(row, "available") ?? true,
    notes: fieldStr(row, "notes") ?? null,
  }))
}

async function loadLastTrainedByFocus(
  scheduleSlug: string | null
): Promise<readonly DigestFocusRecency[]> {
  if (scheduleSlug === null) return []
  const asked = await askComposed({
    "page-type": "schedule-day",
    where: { "schedule-slug": { is: scheduleSlug } },
    keys: ["id", "focus"],
    limit: 50,
  })
  if (!asked.ok) throw new Error(`loadLastTrainedByFocus(${scheduleSlug}): ${asked.why}`)
  const focuses = [
    ...new Set(
      asked.answer.rows
        .map((r) => r.values.focus)
        .filter((f): f is string => typeof f === "string" && f !== "rest")
    ),
  ]
  const out: DigestFocusRecency[] = []
  for (const focus of focuses) {
    const sessions = await recentSessionsForFocus(scheduleSlug, focus)
    out.push({
      focus,
      lastTrained: sessions[0] !== undefined ? (fieldStr(sessions[0], "date") ?? null) : null,
    })
  }
  return out
}

export async function loadDigest(
  focusArg: string | undefined,
  now: Date,
  bodyweight: number
): Promise<DigestResult> {
  const dayStr = getEsoDayStr(now)
  const dayOfWeek = dayOfWeekFromDayStr(dayStr)
  const schedule = await resolveActiveSchedule()
  const scheduleSlug = schedule?.slug ?? null

  let focus: string | null = focusArg ?? null
  if (focus === null && scheduleSlug !== null) {
    const asked = await askComposed({
      "page-type": "schedule-day",
      where: { "schedule-slug": { is: scheduleSlug }, "day-of-week": { is: dayOfWeek } },
      keys: ["focus"],
      limit: 1,
    })
    if (!asked.ok) throw new Error(`loadDigest: ${asked.why}`)
    const scheduledRaw = asked.answer.rows[0]?.values.focus
    const scheduled = typeof scheduledRaw === "string" ? scheduledRaw : undefined
    focus = scheduled !== undefined && scheduled !== "rest" ? scheduled : null
  }

  const recentSessions =
    focus !== null && scheduleSlug !== null
      ? await recentSessionsForFocus(scheduleSlug, focus)
      : []

  const movementSlugs = await distinctExercisesInSessions(recentSessions)
  const titles = await exerciseTitles(movementSlugs)
  const movements: DigestMovement[] = []
  for (const slug of movementSlugs) {
    const lines = await setLinesForExercise(slug)
    const best = bestSet(lines)
    movements.push({
      id: slug,
      name: titles.get(slug) ?? slug,
      last: lastWorkingSet(lines),
      best,
      target: progressionTarget(best),
    })
  }

  const [equipment, lastSession, mobility, constraints, lastTrainedByFocus] = await Promise.all([
    loadEquipment(),
    buildLastSession(recentSessions[0], bodyweight),
    loadMobility(),
    loadConstraints(focus),
    loadLastTrainedByFocus(scheduleSlug),
  ])

  return {
    date: dayStr,
    focus,
    bodyweight,
    equipment,
    lastTrainedByFocus,
    movements,
    lastSession,
    mobility,
    constraints,
  }
}
