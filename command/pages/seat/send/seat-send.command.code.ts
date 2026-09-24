import {
  type Sending,
  writeMessage,
} from "akasha/agent/message/modules/sending/agent-message-sending.module.code.ts"
import { akashaSeatSlugOf } from "akasha/agent/seat/modules/akasha-beside/seat-akasha-beside.module.code.ts"
import { seatAbove } from "akasha/agent/subagent/modules/naming/subagent-naming.module.code.ts"
import { optionalEnv } from "akasha/code/type/narrowing/modules/require-env/require-env.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { body } from "akasha/command/argument/pages/body.argument.ts"
import { bodyFile } from "akasha/command/argument/pages/body-file.argument.ts"
import { toSeat } from "akasha/command/argument/pages/to-seat.argument.ts"
import { answering, told } from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  type Filing,
  filledIn,
} from "akasha/command/modules/filling/command-filling.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { seatSend as page } from "akasha/command/pages/seat/send/seat-send.command.ts"

const BODY_FILING: Filing = { said: "--body", file: "--body-file", whole: true }

export const NO_SENDER =
  "`AGENT_ID` names no seat, so there is no seat to send as, and nothing was sent"

const NO_BODY = "a message says something, and this names no `--body` or `--body-file`"

export type SeatNaming = (agentId: string) => string | null

export function senderIn(
  agentId: string | undefined,
  naming: SeatNaming = akashaSeatSlugOf
): string | null {
  if (agentId === undefined || agentId === "") return null
  const own = naming(agentId)
  if (own !== null) return own
  const above = seatAbove(agentId)
  return above === null ? null : naming(above)
}

export type Stated = {
  readonly to: string
  readonly from: string
  readonly body: string
}

export async function sent(stated: Stated, sending?: Sending): Promise<Answer> {
  const wrote = await writeMessage({ ...stated, warrant: "announce" }, sending)
  if (wrote.kind === "refused") {
    return mistaking([`nothing was sent to \`${stated.to}\`: ${wrote.detail}`])
  }
  return told([`sent ${wrote.id} to ${stated.to} from ${stated.from}`])
}

export async function seatSend(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [toSeat, bodyFile, body])
  if ("refused" in read) return mistaking(read.refused)
  const from = senderIn(optionalEnv("AGENT_ID"))
  if (from === null) return mistaking([NO_SENDER])
  const said = filledIn(given.root, read.taken.body, read.taken.bodyFile, BODY_FILING)
  if ("refused" in said) return mistaking(said.refused)
  const text = said.text
  if (text === undefined || text.trim() === "") return mistaking([NO_BODY])
  return await answering(() => sent({ to: read.taken.toSeat, from, body: text }))
}
