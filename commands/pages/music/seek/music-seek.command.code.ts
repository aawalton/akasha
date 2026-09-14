import type { DeviceOption } from "akasha/alan/music/spotify/modules/player/spotify-player.module.code.ts"
import { seek } from "akasha/alan/music/spotify/modules/player/spotify-player.module.code.ts"
import { takenFor } from "akasha/commands/arguments/modules/taking/argument-taking.module.code.ts"
import { deviceId as deviceIdArgument } from "akasha/commands/arguments/pages/device-id.argument.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import { seconds as secondsArgument } from "akasha/commands/arguments/pages/seconds.argument.ts"
import {
  answering,
  INPUT,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  optionFor,
  whereOf,
} from "akasha/commands/pages/music/modules/device-option/device-option.module.code.ts"
import { musicSeek as page } from "akasha/commands/pages/music/seek/music-seek.command.ts"

const NAMED = [deviceIdArgument, json, secondsArgument]

const MS_PER_SECOND = 1000

export type Seeking = {
  readonly seek: (positionMs: number, options: DeviceOption) => Promise<void>
}

const SEEKING: Seeking = { seek }

type SeekEnvelope = {
  readonly seconds: number
  readonly positionMs: number
  readonly deviceId: string | null
}

export async function seeking(
  argv: readonly string[],
  ports: Seeking,
  calledAs: string
): Promise<Answer> {
  const read = takenFor(argv, calledAs, page, NAMED)
  if ("refused" in read) return refusedBy(read.refused, INPUT)
  const taken = read.taken
  const positionMs = taken.seconds * MS_PER_SECOND
  return await answering(async () => {
    await ports.seek(positionMs, optionFor(taken.deviceId))
    const envelope: SeekEnvelope = {
      seconds: taken.seconds,
      positionMs,
      deviceId: taken.deviceId ?? null,
    }
    const line = `⏩ Moved to ${taken.seconds}s on ${whereOf(taken.deviceId)}`
    return told([taken.json ? JSON.stringify(envelope) : line])
  })
}

export function musicSeek(argv: readonly string[], given: Given): Promise<Answer> {
  return seeking(argv, SEEKING, given.calledAs)
}
