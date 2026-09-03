import {
  boolIn,
  numberIn,
  type Row,
  rowsFor,
  textIn,
} from "../exercise-rows/exercise-rows.module.code.ts"
import { sessionVolume } from "../session-volume/session-volume.module.code.ts"
import { bestSet, lastWorkingSet, type SetLine } from "../set-history/set-history.module.code.ts"
import { type SetTarget, targetPast } from "../set-target/set-target.module.code.ts"

const EXERCISE = "exercise"

const SET_LOG = "set-log"

const WORKOUT_SESSION = "workout-session"

const SESSIONS_SOURCING_MOVEMENTS = 3

const SETS_PER_MOVEMENT = 30

export interface MovementStanding {
  readonly slug: string
  readonly name: string
  readonly last: SetLine | null
  readonly best: SetLine | null
  readonly target: SetTarget | null
}

export interface SessionStanding {
  readonly id: string
  readonly date: string | null
  readonly totalVolume: number
  readonly movements: readonly string[]
}

export type Titled = { readonly titles: ReadonlyMap<string, string> } | { readonly refused: string }

export type Lined = { readonly lines: readonly SetLine[] } | { readonly refused: string }

export type Slugged = { readonly slugs: readonly string[] } | { readonly refused: string }

export type Standing =
  | { readonly standings: readonly MovementStanding[] }
  | { readonly refused: string }

export type Summarised =
  | { readonly standing: SessionStanding | null }
  | { readonly refused: string }

export function titlesIn(exercises: readonly Row[]): ReadonlyMap<string, string> {
  const held = new Map<string, string>()
  for (const row of exercises) {
    if (row.slug === null) continue
    held.set(row.slug, textIn(row, "title") ?? row.slug)
  }
  return held
}

export async function exerciseTitles(slugs: readonly string[]): Promise<Titled> {
  if (slugs.length === 0) return { titles: new Map() }
  const found = await rowsFor({
    pageTypeSlug: EXERCISE,
    where: [{ key: "slug", in: slugs }],
    select: ["id", "slug", "title"],
  })
  if ("unread" in found) return { refused: found.unread }
  return { titles: titlesIn(found.rows) }
}

export function setLineIn(row: Row, date: string | null): SetLine {
  return {
    date,
    setNumber: numberIn(row, "setNumber") ?? null,
    reps: numberIn(row, "reps") ?? null,
    weight: numberIn(row, "weight") ?? null,
    rpe: numberIn(row, "rpe") ?? null,
    isWarmup: boolIn(row, "isWarmup"),
  }
}

export function sessionSlugsIn(setLogs: readonly Row[]): readonly string[] {
  return [
    ...new Set(
      setLogs
        .map((row) => textIn(row, "sessionSlug"))
        .filter((slug): slug is string => slug !== undefined)
    ),
  ]
}

export function datesBySession(sessions: readonly Row[]): ReadonlyMap<string, string> {
  const held = new Map<string, string>()
  for (const row of sessions) {
    const date = textIn(row, "workoutSessionDate")
    if (date !== undefined && row.slug !== null) held.set(row.slug, date)
  }
  return held
}

export function linesIn(
  setLogs: readonly Row[],
  dates: ReadonlyMap<string, string>
): readonly SetLine[] {
  return setLogs.map((row) => {
    const sessionSlug = textIn(row, "sessionSlug")
    return setLineIn(row, sessionSlug === undefined ? null : (dates.get(sessionSlug) ?? null))
  })
}

export async function setLinesFor(exerciseSlug: string): Promise<Lined> {
  const logs = await rowsFor({
    pageTypeSlug: SET_LOG,
    where: [{ key: "exerciseSlug", eq: exerciseSlug }],
    order: [{ by: "slug", dir: "desc" }],
    limit: SETS_PER_MOVEMENT,
  })
  if ("unread" in logs) return { refused: logs.unread }
  const slugs = sessionSlugsIn(logs.rows)
  if (slugs.length === 0) return { lines: linesIn(logs.rows, new Map()) }
  const sessions = await rowsFor({
    pageTypeSlug: WORKOUT_SESSION,
    where: [{ key: "slug", in: slugs }],
    select: ["id", "slug", "workoutSessionDate"],
  })
  if ("unread" in sessions) return { refused: sessions.unread }
  return { lines: linesIn(logs.rows, datesBySession(sessions.rows)) }
}

export function movementSlugsIn(setLogs: readonly Row[]): readonly string[] {
  return [
    ...new Set(
      setLogs
        .map((row) => textIn(row, "exerciseSlug"))
        .filter((slug): slug is string => slug !== undefined)
    ),
  ]
}

export async function movementsInSessions(sessions: readonly Row[]): Promise<Slugged> {
  const slugs = sessions
    .slice(0, SESSIONS_SOURCING_MOVEMENTS)
    .map((row) => row.slug)
    .filter((slug): slug is string => slug !== null)
  if (slugs.length === 0) return { slugs: [] }
  const logs = await rowsFor({
    pageTypeSlug: SET_LOG,
    where: [{ key: "sessionSlug", in: slugs }],
    select: ["id", "exerciseSlug"],
  })
  if ("unread" in logs) return { refused: logs.unread }
  return { slugs: movementSlugsIn(logs.rows) }
}

export async function movementStandings(slugs: readonly string[]): Promise<Standing> {
  const titled = await exerciseTitles(slugs)
  if ("refused" in titled) return titled
  const found: MovementStanding[] = []
  for (const slug of slugs) {
    const lined = await setLinesFor(slug)
    if ("refused" in lined) return lined
    const best = bestSet(lined.lines)
    found.push({
      slug,
      name: titled.titles.get(slug) ?? slug,
      last: lastWorkingSet(lined.lines),
      best,
      target: targetPast(best),
    })
  }
  return { standings: found }
}

export async function sessionStanding(
  session: Row | undefined,
  bodyweight: number
): Promise<Summarised> {
  if (session === undefined || session.slug === null) return { standing: null }
  const logs = await rowsFor({
    pageTypeSlug: SET_LOG,
    where: [{ key: "sessionSlug", eq: session.slug }],
    select: ["id", "exerciseSlug"],
  })
  if ("unread" in logs) return { refused: logs.unread }
  const slugs = movementSlugsIn(logs.rows)
  const titled = await exerciseTitles(slugs)
  if ("refused" in titled) return titled
  const counted = await sessionVolume(session.slug, bodyweight)
  if ("refused" in counted) return counted
  return {
    standing: {
      id: session.id,
      date: textIn(session, "workoutSessionDate") ?? null,
      totalVolume: counted.volume,
      movements: slugs.map((slug) => titled.titles.get(slug) ?? slug),
    },
  }
}
