import type { DeviceOption } from "akasha/alan/music/spotify/modules/player/spotify-player.module.code.ts"
import { pausePlayback } from "akasha/alan/music/spotify/modules/player/spotify-player.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { deviceId as deviceIdArgument } from "akasha/command/argument/pages/device-id.argument.ts"
import { json } from "akasha/command/argument/pages/json.argument.ts"
import {
  answering,
  INPUT,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  optionFor,
  whereOf,
} from "akasha/command/pages/music/modules/device-option/device-option.module.code.ts"
import { musicPause as page } from "akasha/command/pages/music/pause/music-pause.command.ts"

const NAMED = [deviceIdArgument, json]

export type Holding = {
  readonly pausePlayback: (options: DeviceOption) => Promise<void>
}

const HOLDING: Holding = { pausePlayback }

type HoldEnvelope = {
  readonly held: true
  readonly deviceId: string | null
}

export async function holding(
  argv: readonly string[],
  ports: Holding,
  calledAs: string
): Promise<Answer> {
  const read = takenFor(argv, calledAs, page, NAMED)
  if ("refused" in read) return refusedBy(read.refused, INPUT)
  const taken = read.taken
  return await answering(async () => {
    await ports.pausePlayback(optionFor(taken.deviceId))
    const envelope: HoldEnvelope = { held: true, deviceId: taken.deviceId ?? null }
    const said = taken.json ? JSON.stringify(envelope) : `⏸ Held on ${whereOf(taken.deviceId)}`
    return told([said])
  })
}

export function musicPause(argv: readonly string[], given: Given): Promise<Answer> {
  return holding(argv, HOLDING, given.calledAs)
}
