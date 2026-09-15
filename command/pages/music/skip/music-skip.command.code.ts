import type { DeviceOption } from "akasha/alan/music/spotify/modules/player/spotify-player.module.code.ts"
import { skipToNext } from "akasha/alan/music/spotify/modules/player/spotify-player.module.code.ts"
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
import { musicSkip as page } from "akasha/command/pages/music/skip/music-skip.command.ts"

const NAMED = [deviceIdArgument, json]

export type Skipping = {
  readonly skipToNext: (options: DeviceOption) => Promise<void>
}

const SKIPPING: Skipping = { skipToNext }

type SkipEnvelope = {
  readonly skipped: true
  readonly deviceId: string | null
}

export async function skipping(
  argv: readonly string[],
  ports: Skipping,
  calledAs: string
): Promise<Answer> {
  const read = takenFor(argv, calledAs, page, NAMED)
  if ("refused" in read) return refusedBy(read.refused, INPUT)
  const taken = read.taken
  return await answering(async () => {
    await ports.skipToNext(optionFor(taken.deviceId))
    const envelope: SkipEnvelope = { skipped: true, deviceId: taken.deviceId ?? null }
    const line = `⏭ Skipped ahead on ${whereOf(taken.deviceId)}`
    return told([taken.json ? JSON.stringify(envelope) : line])
  })
}

export function musicSkip(argv: readonly string[], given: Given): Promise<Answer> {
  return skipping(argv, SKIPPING, given.calledAs)
}
