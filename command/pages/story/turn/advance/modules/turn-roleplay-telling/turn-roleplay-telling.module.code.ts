import { roleplayRecorder } from "akasha/agent/role/pages/roleplay-recorder.role.ts"
import { akashaSeatsStated } from "akasha/agent/seat/modules/akasha-read/seat-akasha-read.module.code.ts"
import {
  noticesSent,
  type Reach,
  type Told,
} from "akasha/command/pages/story/turn/modules/turn-reaching/turn-reaching.module.code.ts"
import { readyTold } from "akasha/command/pages/story/turn/modules/turn-ready-pushing/turn-ready-pushing.module.code.ts"
import type { Context } from "akasha/command/pages/story/turn/modules/turn-starting/turn-starting.module.code.ts"
import { textAt } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  bareOf,
  type Noun,
  noticeOf,
  type Repair,
  TURN,
  type TurnStep,
  WORLD_BUILDER,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"

const ROLE_STATED = "role-slug"

const GAME_STATED = "domain-slug"

export type Roleplaying = (game: string) => readonly string[]

export function roleplayRecordersStated(game: string): readonly string[] {
  return akashaSeatsStated().flatMap((one) => {
    const role = textAt(one.values, ROLE_STATED)
    const of = textAt(one.values, GAME_STATED)
    if (role === null || of === null) return []
    return bareOf(role) === roleplayRecorder.slug && bareOf(of) === game ? [one.name] : []
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
}

export async function roleplayTold(
  reach: Pick<Reach, "notify" | "readyPushed">,
  telling: Telling,
  after: Told,
  seatsOf: Roleplaying = roleplayRecordersStated
): Promise<undefined> {
  const noun = telling.noun ?? TURN
  if (telling.from === WORLD_BUILDER) {
    await readyTold(reach.readyPushed, telling.root, telling.game, telling.turn, after.report, noun)
  }
  const seats = seatsOf(telling.game)
  if (seats.length === 0) {
    after.faults.push(
      `\`${telling.game}\` has no ${roleplayRecorder.slug} seat up, so no seat was told the ${noun} moved`
    )
    return undefined
  }
  const said = noticeOf(telling.turn, telling.status, [], noun, telling.repairs ?? [])
  for (const to of seats) {
    const why = await reach.notify(to, said)
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
    await roleplayTold(reach, { root, game, turn, from, status, noun, repairs }, after)
    return undefined
  }
  await noticesSent(reach, root, game, master, turn, status, after, lore, noun, crossed, repairs)
  return undefined
}
