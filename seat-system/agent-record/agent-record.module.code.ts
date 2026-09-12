import { writeMessage } from "akasha/agents/messaging/message-file/message-file.module.code.ts"
import { akashaSeatIdForName } from "akasha/seat-system/seat-akasha-beside/seat-akasha-beside.module.code.ts"

const DEFAULT_SENDER = "service"

export type SeatReading =
  | { readonly kind: "page-stands" }
  | { readonly kind: "no-page" }
  | { readonly kind: "unreachable"; readonly why: string }

export function readSeatPage(handler: string): SeatReading {
  try {
    return akashaSeatIdForName(handler) === null ? { kind: "no-page" } : { kind: "page-stands" }
  } catch (error) {
    return { kind: "unreachable", why: `the seats cannot be read here: ${String(error)}` }
  }
}

export async function writeAnnouncement(
  handler: string,
  body: string,
  log: (line: string) => void,
  from: string = DEFAULT_SENDER
): Promise<string> {
  const seat = readSeatPage(handler)
  if (seat.kind === "no-page") {
    throw new Error(
      `no seat currently holds the name \`${handler}\` — refused rather than written where nobody ` +
        "drains it, so whatever was waiting stays untold and the next pass tries again"
    )
  }
  if (seat.kind === "unreachable") {
    log(
      `nothing here could say whether a seat holds \`${handler}\` — ${seat.why}. The message is ` +
        "addressed by name regardless, and whoever drains it resolves the seat"
    )
  }
  const wrote = await writeMessage({ to: handler, from, warrant: "announce", body })
  if (wrote.kind === "refused") {
    throw new Error(
      `the message to \`${handler}\` was not written, so nothing is waiting: ${wrote.detail}`
    )
  }
  return wrote.id
}

export function recordToAgent(
  handler: string,
  body: string,
  log: (line: string) => void,
  from: string = DEFAULT_SENDER
): Promise<string> {
  return writeAnnouncement(handler, body, log, from)
}
