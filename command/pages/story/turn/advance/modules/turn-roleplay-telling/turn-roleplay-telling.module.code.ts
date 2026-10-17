import { roleplayRecorder } from "akasha/agent/role/pages/roleplay-recorder.role.ts"
import { akashaSeatsStated } from "akasha/agent/seat/modules/akasha-read/seat-akasha-read.module.code.ts"
import type {
  Reach,
  Told,
} from "akasha/command/pages/story/turn/modules/turn-reaching/turn-reaching.module.code.ts"
import { textAt } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  bareOf,
  type Noun,
  noticeOf,
  type Repair,
  TURN,
  type TurnStep,
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
  readonly game: string
  readonly turn: string
  readonly status: TurnStep
  readonly noun?: Noun | undefined
  readonly repairs?: readonly Repair[] | undefined
}

export async function roleplayTold(
  reach: Pick<Reach, "notify">,
  telling: Telling,
  after: Told,
  seatsOf: Roleplaying = roleplayRecordersStated
): Promise<undefined> {
  const noun = telling.noun ?? TURN
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
