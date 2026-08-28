import { statSync } from "node:fs"
import { agentPageFor, type Reading, readRecordFor, sameBody } from "../read-record.ts"
import { blobId } from "../../repo/git/git.ts"
import { seatWarrantsWithDefaults, subagentWarrantsFor } from "../required-reading/required-reading.ts"
import { seatAbove } from "../writer.ts"
import { textAt } from "../../page/text/text.ts"
import { standingHere } from "../../page/required-reading/warrant/warrant.ts"
import { refusalText } from "../../refusal/refusal.ts"

const OWED = "for your seat"

const LAPSED =
  "nothing can say what you have read, so every document your persona, domain and role " +
  "stand on would go unread with nothing saying so"

function routeTo(absolute: string): string {
  return `ops read --file-path ${absolute}`
}

function whenText(at: number): string {
  return new Date(at).toISOString().replace("T", " ").slice(0, 19)
}

function changedAt(absolute: string): string {
  try {
    return whenText(statSync(absolute).mtimeMs)
  } catch {
    return "a time nothing recorded"
  }
}

function refusalOver(
  reading: Reading | null,
  body: string,
  said: string,
  absolute: string
): string | null {
  const route = routeTo(absolute)
  if (reading === null) return refusalText("required-document-unread", { path: said, owed: OWED, route })
  const oid = blobId(new TextEncoder().encode(body))
  if (!sameBody(reading, oid)) {
    return refusalText("required-document-changed", {
      path: said,
      owed: OWED,
      read: whenText(reading.seenAt),
      changed: changedAt(absolute),
      route,
    })
  }
  return null
}

export function unreadForSeatWith(
  readText: typeof textAt,
  defaults?: ReadonlyMap<string, string>
): (writer: string | null) => readonly string[] {
  return (writer) => {
    if (writer === null) return [refusalText("writer-unidentified", {})]
    const log = readRecordFor(writer)
    if (log === null) return [refusalText("agent-page-absent", { agent: writer, lapsed: LAPSED })]
    const above = seatAbove(writer)
    const seat = above === null ? log.page : agentPageFor(above)
    if (seat === null) {
      const agent = above ?? writer
      return [refusalText("agent-page-absent", { agent, lapsed: LAPSED })]
    }
    const { index, rootOf } = standingHere()
    const body = readText("", seat.slice(1))
    if (body === null) {
      return [`${seat} — ${refusalText("seat-page-unreadable", { agent: above ?? writer, path: seat })}`]
    }
    const warranted =
      above === null
        ? seatWarrantsWithDefaults(body, index, defaults)
        : subagentWarrantsFor(body, index, defaults)
    const said: string[] = []
    for (const one of warranted) {
      const root = rootOf(one.page.repo)
      if (root === undefined) continue
      const absolute = `${root}/${one.page.key}`
      const held = readText(root, one.page.key)
      if (held === null) continue
      const why = refusalOver(log.reading(absolute), held, one.page.key, absolute)
      if (why !== null) said.push(`${seat} — ${why}`)
    }
    return said
  }
}

export const unreadForSeat = unreadForSeatWith(textAt)
