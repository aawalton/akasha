import type { DeviceOption } from "akasha/alan/music/spotify/modules/player/spotify-player.module.code.ts"
import { setVolume } from "akasha/alan/music/spotify/modules/player/spotify-player.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { deviceId as deviceIdArgument } from "akasha/command/argument/pages/device-id.argument.ts"
import { json } from "akasha/command/argument/pages/json.argument.ts"
import { percent as percentArgument } from "akasha/command/argument/pages/percent.argument.ts"
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
import { musicVolume as page } from "akasha/command/pages/music/volume/music-volume.command.ts"

const NAMED = [deviceIdArgument, json, percentArgument]

const MOST = 100

export type Sounding = {
  readonly setVolume: (volumePercent: number, options: DeviceOption) => Promise<void>
}

const SOUNDING: Sounding = { setVolume }

type VolumeEnvelope = {
  readonly percent: number
  readonly deviceId: string | null
}

function wrongIn(said: number): string | null {
  if (said <= MOST) return null
  const word = percentArgument.placeholder
  return `\`<${word}>\` takes nought to a hundred, and ${said} is past that`
}

export async function sounding(
  argv: readonly string[],
  ports: Sounding,
  calledAs: string
): Promise<Answer> {
  const read = takenFor(argv, calledAs, page, NAMED)
  if ("refused" in read) return refusedBy(read.refused, INPUT)
  const taken = read.taken
  const wrong = wrongIn(taken.percent)
  if (wrong !== null) return refused(wrong, INPUT)
  return await answering(async () => {
    await ports.setVolume(taken.percent, optionFor(taken.deviceId))
    const envelope: VolumeEnvelope = { percent: taken.percent, deviceId: taken.deviceId ?? null }
    const line = `🔊 Loudness ${taken.percent} on ${whereOf(taken.deviceId)}`
    return told([taken.json ? JSON.stringify(envelope) : line])
  })
}

export function musicVolume(argv: readonly string[], given: Given): Promise<Answer> {
  return sounding(argv, SOUNDING, given.calledAs)
}
