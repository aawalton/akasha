import type { DeviceOption } from "akasha/alan/music/spotify/modules/player/spotify-player.module.code.ts"
import { toggleShuffle } from "akasha/alan/music/spotify/modules/player/spotify-player.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { deviceId as deviceIdArgument } from "akasha/command/argument/pages/device-id.argument.ts"
import { json } from "akasha/command/argument/pages/json.argument.ts"
import { shuffleState as stateArgument } from "akasha/command/argument/pages/shuffle-state.argument.ts"
import {
  answering,
  INPUT,
  refused,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  optionFor,
  whereOf,
} from "akasha/command/pages/music/modules/device-option/device-option.module.code.ts"
import { musicShuffle as page } from "akasha/command/pages/music/shuffle/music-shuffle.command.ts"

const NAMED = [deviceIdArgument, json, stateArgument]

const ON = "on"

const OFF = "off"

export type Shuffling = {
  readonly toggleShuffle: (state: boolean, options: DeviceOption) => Promise<void>
}

const SHUFFLING: Shuffling = { toggleShuffle }

type ShuffleEnvelope = {
  readonly shuffle: boolean
  readonly deviceId: string | null
}

function stateOf(said: string): boolean | null {
  if (said === ON) return true
  if (said === OFF) return false
  return null
}

function wrongOf(said: string): string {
  const word = stateArgument.placeholder
  return `\`<${word}>\` takes \`${ON}\` or \`${OFF}\`, and \`${said}\` is neither`
}

export async function shuffling(
  argv: readonly string[],
  ports: Shuffling,
  calledAs: string
): Promise<Answer> {
  const read = takenFor(argv, calledAs, page, NAMED)
  if ("refused" in read) return refusedBy(read.refused, INPUT)
  const taken = read.taken
  const state = stateOf(taken.shuffleState)
  if (state === null) return refused(wrongOf(taken.shuffleState), INPUT)
  return await answering(async () => {
    await ports.toggleShuffle(state, optionFor(taken.deviceId))
    const envelope: ShuffleEnvelope = { shuffle: state, deviceId: taken.deviceId ?? null }
    const line = `🔀 Shuffle ${taken.shuffleState} · ${whereOf(taken.deviceId)}`
    return told([taken.json ? JSON.stringify(envelope) : line])
  })
}

export function musicShuffle(argv: readonly string[], given: Given): Promise<Answer> {
  return shuffling(argv, SHUFFLING, given.calledAs)
}
