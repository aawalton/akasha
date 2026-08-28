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

/**
 * What a writer's seat stands on and the writer has not read, as refusal lines.
 *
 * HANDED HOW TO READ A FILE RATHER THAN IMPORTING IT SO NOTHING HAS TO MOCK THE MODULE TO STAND
 * FILES SOMEWHERE ELSE. `mock.module` is process-global and mutates the namespace object in place,
 * and `mock.restore()` leaves the replacement standing, so a test that mocks `page/text/text.ts`
 * leaves every other test file in the same run reading through its stub. Taking the reader as an
 * argument keeps a substitution to the caller that made it.
 */
export function unreadForSeatWith(
  readText: typeof textAt,
  defaults?: ReadonlyMap<string, string>
): (writer: string | null) => readonly string[] {
  return (writer) => {
    if (writer === null) return [refusalText("writer-unidentified", {})]
    const log = readRecordFor(writer)
    if (log === null) return [refusalText("agent-page-absent", { agent: writer, lapsed: LAPSED })]
    // A SUBAGENT IS JUDGED THROUGH THE SEAT ABOVE IT. A subagent's own page states no persona, no
    // domain and no role, so resolving warrants from it answers zero for every subagent, and most
    // writes here are made by subagents. The seat's page carries the domain; the persona and the
    // role come from the declared defaults, which is what the subagent page type says a subagent
    // reads for.
    const above = seatAbove(writer)
    const seat = above === null ? log.page : agentPageFor(above)
    if (seat === null) {
      const agent = above ?? writer
      return [refusalText("agent-page-absent", { agent, lapsed: LAPSED })]
    }
    const { index, rootOf } = standingHere()
    const body = readText("", seat.slice(1))
    /**
     * A SEAT PAGE THAT WILL NOT READ IS A REFUSAL, NOT A WRITER WHO OWES NOTHING. Answering "owes
     * nothing" for a page nobody can read is the one answer this code exists to never give: every
     * seat's whole reading falls away the moment the page stops reading, and nothing about that
     * looks like a fault, because a writer owing nothing is the ordinary case for a writer who has
     * read. `runsOn` in `checks-system/checks.ts` throws on the same shape for the same reason.
     */
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
      // THE REFUSAL NAMES THE SEAT'S PAGE RATHER THAN A FILE BEING WRITTEN, the fault being with
      // neither.
      const why = refusalOver(log.reading(absolute), held, one.page.key, absolute)
      if (why !== null) said.push(`${seat} — ${why}`)
    }
    return said
  }
}

export const unreadForSeat = unreadForSeatWith(textAt)
