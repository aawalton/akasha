import { writeMessage } from "../messaging/message-file/message-file.module.code.ts"
import { akashaSeatIdForName } from "../seat-akasha-beside/seat-akasha-beside.module.code.ts"

const DEFAULT_SENDER = "service"

export type SeatReading =
  | { readonly kind: "page-stands" }
  | { readonly kind: "no-page" }
  | { readonly kind: "unreachable"; readonly why: string }

// THREE ANSWERS, AND THE MIDDLE ONE IS THE POINT. A seat that is not there and a place where no
// seat can be read must not read alike, or a handler nobody has heard of and a repository that
// cannot be looked at get the same treatment. This checked that a seat directory existed on disk
// to draw that line; akasha draws it already, refusing a root that names no seat index at all and
// answering for one that does.
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

export async function recordToAgent(
  handler: string,
  body: string,
  log: (line: string) => void,
  from: string = DEFAULT_SENDER
): Promise<string> {
  return Promise.resolve(await writeAnnouncement(handler, body, log, from))
}
