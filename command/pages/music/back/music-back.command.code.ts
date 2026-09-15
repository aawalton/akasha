import type { DeviceOption } from "akasha/alan/music/spotify/modules/player/spotify-player.module.code.ts"
import { skipToPrevious } from "akasha/alan/music/spotify/modules/player/spotify-player.module.code.ts"
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
import { musicBack as page } from "akasha/command/pages/music/back/music-back.command.ts"
import {
  optionFor,
  whereOf,
} from "akasha/command/pages/music/modules/device-option/device-option.module.code.ts"

const NAMED = [deviceIdArgument, json]

export type Backing = {
  readonly skipToPrevious: (options: DeviceOption) => Promise<void>
}

const BACKING: Backing = { skipToPrevious }

type BackEnvelope = {
  readonly back: true
  readonly deviceId: string | null
}

export async function backing(
  argv: readonly string[],
  ports: Backing,
  calledAs: string
): Promise<Answer> {
  const read = takenFor(argv, calledAs, page, NAMED)
  if ("refused" in read) return refusedBy(read.refused, INPUT)
  const taken = read.taken
  return await answering(async () => {
    await ports.skipToPrevious(optionFor(taken.deviceId))
    const envelope: BackEnvelope = { back: true, deviceId: taken.deviceId ?? null }
    const line = `⏮ Went back on ${whereOf(taken.deviceId)}`
    return told([taken.json ? JSON.stringify(envelope) : line])
  })
}

export function musicBack(argv: readonly string[], given: Given): Promise<Answer> {
  return backing(argv, BACKING, given.calledAs)
}
