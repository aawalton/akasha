import type {
  DeviceOption,
  RepeatState,
} from "akasha/alan/music/spotify/modules/player/spotify-player.module.code.ts"
import { setRepeatMode } from "akasha/alan/music/spotify/modules/player/spotify-player.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { deviceId as deviceIdArgument } from "akasha/command/argument/pages/device-id.argument.ts"
import { json } from "akasha/command/argument/pages/json.argument.ts"
import { repeatState as stateArgument } from "akasha/command/argument/pages/repeat-state.argument.ts"
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
import { musicRepeat as page } from "akasha/command/pages/music/repeat/music-repeat.command.ts"

const NAMED = [deviceIdArgument, json, stateArgument]

const STATES: readonly RepeatState[] = ["track", "context", "off"]

export type Repeating = {
  readonly setRepeatMode: (state: RepeatState, options: DeviceOption) => Promise<void>
}

const REPEATING: Repeating = { setRepeatMode }

type RepeatEnvelope = {
  readonly repeat: RepeatState
  readonly deviceId: string | null
}

function stateOf(said: string): RepeatState | null {
  return STATES.find((one) => one === said) ?? null
}

function wrongOf(said: string): string {
  const word = stateArgument.placeholder
  return `\`<${word}>\` takes \`track\`, \`context\` or \`off\`, and \`${said}\` is none of them`
}

export async function repeating(
  argv: readonly string[],
  ports: Repeating,
  calledAs: string
): Promise<Answer> {
  const read = takenFor(argv, calledAs, page, NAMED)
  if ("refused" in read) return refusedBy(read.refused, INPUT)
  const taken = read.taken
  const state = stateOf(taken.repeatState)
  if (state === null) return refused(wrongOf(taken.repeatState), INPUT)
  return await answering(async () => {
    await ports.setRepeatMode(state, optionFor(taken.deviceId))
    const envelope: RepeatEnvelope = { repeat: state, deviceId: taken.deviceId ?? null }
    const line = `🔁 Repeat ${state} · ${whereOf(taken.deviceId)}`
    return told([taken.json ? JSON.stringify(envelope) : line])
  })
}

export function musicRepeat(argv: readonly string[], given: Given): Promise<Answer> {
  return repeating(argv, REPEATING, given.calledAs)
}
