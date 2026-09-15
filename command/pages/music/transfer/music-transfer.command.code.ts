import { transferPlayback } from "akasha/alan/music/spotify/modules/player/spotify-player.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { deviceId as deviceIdArgument } from "akasha/command/argument/pages/device-id.argument.ts"
import { json } from "akasha/command/argument/pages/json.argument.ts"
import { play as playArgument } from "akasha/command/argument/pages/play.argument.ts"
import {
  answering,
  INPUT,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { musicTransfer as page } from "akasha/command/pages/music/transfer/music-transfer.command.ts"

const NAMED = [deviceIdArgument, json, playArgument]

export type Moving = {
  readonly transferPlayback: (deviceIds: readonly string[], play?: boolean) => Promise<void>
}

const MOVING: Moving = { transferPlayback }

type TransferEnvelope = {
  readonly deviceIds: readonly string[]
  readonly play: boolean
}

function lineOf(ids: readonly string[], play: boolean): string {
  const said = ids.join(", ")
  return play ? `📲 Playback moved to ${said} and started` : `📲 Playback moved to ${said}`
}

export async function moving(
  argv: readonly string[],
  ports: Moving,
  calledAs: string
): Promise<Answer> {
  const read = takenFor(argv, calledAs, page, NAMED)
  if ("refused" in read) return refusedBy(read.refused, INPUT)
  const taken = read.taken
  return await answering(async () => {
    await ports.transferPlayback(taken.deviceId, taken.play ? true : undefined)
    const envelope: TransferEnvelope = { deviceIds: taken.deviceId, play: taken.play }
    const line = lineOf(taken.deviceId, taken.play)
    return told([taken.json ? JSON.stringify(envelope) : line])
  })
}

export function musicTransfer(argv: readonly string[], given: Given): Promise<Answer> {
  return moving(argv, MOVING, given.calledAs)
}
