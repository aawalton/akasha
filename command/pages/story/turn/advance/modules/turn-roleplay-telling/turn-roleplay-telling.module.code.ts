import { roleplayRecorder } from "akasha/agent/role/pages/roleplay-recorder.role.ts"
import { roleplayWorldbuilder } from "akasha/agent/role/pages/roleplay-worldbuilder.role.ts"
import { akashaSeatsStated } from "akasha/agent/seat/modules/akasha-read/seat-akasha-read.module.code.ts"
import {
  noticesSent,
  type Reach,
  type Told,
} from "akasha/command/pages/story/turn/modules/turn-reaching/turn-reaching.module.code.ts"
import { readyTold } from "akasha/command/pages/story/turn/modules/turn-ready-pushing/turn-ready-pushing.module.code.ts"
import {
  type Context,
  jobOf,
} from "akasha/command/pages/story/turn/modules/turn-starting/turn-starting.module.code.ts"
import { textAt } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  bareOf,
  type Noun,
  noticeOf,
  type Repair,
  type Start,
  TURN,
  type TurnStep,
  WORLD_BUILDER,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"

const ROLE_STATED = "role-slug"

const GAME_STATED = "domain-slug"

const JOBS_OPENING =
  "No seat is started for this step: do each job below yourself, in its order, one advance each, and wait only once the last has landed."

const JOB_BREAK = "\n\n---\n\n"

export type Roleplaying = (game: string, role: string) => readonly string[]

export function roleplaySeatsStated(game: string, role: string): readonly string[] {
  return akashaSeatsStated().flatMap((one) => {
    const stated = textAt(one.values, ROLE_STATED)
    const of = textAt(one.values, GAME_STATED)
    if (stated === null || of === null) return []
    return bareOf(stated) === role && bareOf(of) === game ? [one.name] : []
  })
}

export type Telling = {
  readonly root: string
  readonly game: string
  readonly turn: string
  readonly from: TurnStep
  readonly status: TurnStep
  readonly noun?: Noun | undefined
  readonly repairs?: readonly Repair[] | undefined
  readonly jobs?: readonly string[] | undefined
}

function jobsSaid(said: string, jobs: readonly string[]): string {
  if (jobs.length === 0) return said
  return `${said}\n\n${JOBS_OPENING}${JOB_BREAK}${jobs.join(JOB_BREAK)}`
}

export async function roleplayTold(
  reach: Pick<Reach, "notify" | "readyPushed">,
  telling: Telling,
  after: Told,
  seatsOf: Roleplaying = roleplaySeatsStated
): Promise<undefined> {
  const noun = telling.noun ?? TURN
  const told = telling.from === WORLD_BUILDER
  if (told) {
    await readyTold(reach.readyPushed, telling.root, telling.game, telling.turn, after.report, noun)
  }
  const recorders = seatsOf(telling.game, roleplayRecorder.slug)
  if (recorders.length === 0) {
    after.faults.push(
      `\`${telling.game}\` has no ${roleplayRecorder.slug} seat up, so no seat was told the ${noun} moved`
    )
    return undefined
  }
  const builders = told ? seatsOf(telling.game, roleplayWorldbuilder.slug) : []
  const said = noticeOf(telling.turn, telling.status, [], noun, telling.repairs ?? [])
  const asked = jobsSaid(said, telling.jobs ?? [])
  for (const to of [...recorders, ...builders]) {
    const why = await reach.notify(to, recorders.includes(to) ? asked : said)
    if (why === null) after.report.push(`told\t${to}`)
    else after.faults.push(`\`${to}\` was not told the ${noun} moved: ${why}`)
  }
  return undefined
}

export type Moving = {
  readonly from: TurnStep
  readonly status: TurnStep
  readonly crossed: string
  readonly roleplayed: boolean
  readonly starts: readonly Start[]
}

function jobsOf(at: Context, starts: readonly Start[], after: Told): readonly string[] {
  return starts.flatMap((start) => {
    const job = jobOf(start, at)
    if (typeof job !== "string") return [job.prompt]
    after.faults.push(job)
    return []
  })
}

export async function noticesOver(
  reach: Reach,
  root: string,
  at: Context,
  moving: Moving,
  after: Told
): Promise<undefined> {
  const master = at.story?.master ?? null
  const turn = at.prompting.turnAt
  const { lore, noun, repairs } = at.prompting
  const { game } = at
  const { from, status, crossed } = moving
  if (moving.roleplayed) {
    const jobs = jobsOf(at, moving.starts, after)
    await roleplayTold(reach, { root, game, turn, from, status, noun, repairs, jobs }, after)
    return undefined
  }
  await noticesSent(reach, root, game, master, turn, status, after, lore, noun, crossed, repairs)
  return undefined
}
