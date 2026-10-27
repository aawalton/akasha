import { gameMaster as gameMasterRole } from "akasha/agent/role/pages/game-master/game-master.role.ts"
import { storyRecorder as storyRecorderRole } from "akasha/agent/role/pages/story-recorder.role.ts"
import { writer as writerRole } from "akasha/agent/role/pages/writer.role.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import {
  DATA,
  refused,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/command/modules/fault-saying/fault-saying.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { storyTurnAdvance } from "akasha/command/pages/story/turn/advance/story-turn-advance.command.ts"
import { readyBeatOf } from "akasha/command/pages/story/turn/modules/turn-beat-handing/turn-beat-handing.module.code.ts"
import {
  REACHED,
  type Seated,
} from "akasha/command/pages/story/turn/modules/turn-reaching/turn-reaching.module.code.ts"
import { storyTurnNext as page } from "akasha/command/pages/story/turn/next/story-turn-next.command.ts"
import type { FlowPart } from "akasha/story/engine/beat-state/modules/beat-flow/beat-flow.module.code.ts"
import { recorderOf } from "akasha/story/world/stories/played/turns/modules/turn-beating/turn-beating.module.code.ts"
import {
  coordinatorOf,
  flexOf,
} from "akasha/story/world/stories/played/turns/modules/turn-seats/turn-seats.module.code.ts"

const NAMED = [] as const

const LAST_WORD = /\S+$/

export function nothingSaid(seat: string): string {
  return `no beat is ready for \`${seat}\`, so end your turn: the next beat ready for it comes as a message`
}

const STEPS: readonly FlowPart[] = ["changes", "prose", "memory", "pictured"]

export type HandingOut = (
  root: string,
  game: string,
  calledAs: string
) => Promise<readonly string[]>

async function handedAgain(root: string, game: string, calledAs: string) {
  const master = REACHED.storyOf(root, game)?.master ?? null
  const persona = master === null ? null : (coordinatorOf(master, game)?.persona ?? null)
  if (persona === null) return []
  const slugs = REACHED.recordersIn(root).map((one) => one.slug)
  const said: string[] = []
  for (const part of STEPS) {
    const recorder = recorderOf(part)
    const role = recorder === null ? writerRole.slug : storyRecorderRole.slug
    const flex = recorder === null ? null : flexOf(slugs, recorder)
    const name = [persona, role, game, ...(flex === null ? [] : [flex])].join("-")
    const prompt = readyBeatOf(root, { name, role, game }, calledAs)
    if (prompt === null) continue
    try {
      const handed = await REACHED.start({ persona, role, game, flex, prompt }, [])
      said.push(`handed again\t${handed.name}`)
    } catch (thrown) {
      said.push(`not handed again\t${name}\t${whyOf(thrown)}`)
    }
  }
  return said
}

export async function storyTurnNext(
  argv: readonly string[],
  given: Given,
  seatOf: (root: string, agentId: string | null) => Seated | null = REACHED.seatOf,
  handOut: HandingOut = handedAgain
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return mistaking(read.refused)
  const seat = seatOf(given.root, given.agentId)
  if (seat === null || seat.role === null || seat.game === null) {
    return refused("the caller holds no role in a story, so no beat is ready for it", DATA)
  }
  const advancing = given.calledAs.replace(LAST_WORD, storyTurnAdvance.name)
  const held = { name: seat.name, role: seat.role, game: seat.game }
  const ready = readyBeatOf(given.root, held, advancing)
  if (ready !== null) return told([ready])
  const again =
    seat.role === gameMasterRole.slug ? await handOut(given.root, seat.game, advancing) : []
  return told([nothingSaid(seat.name), ...again])
}
