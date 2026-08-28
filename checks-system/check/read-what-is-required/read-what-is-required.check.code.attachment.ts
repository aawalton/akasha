import { statSync } from "node:fs"
import {
  agentPageFor,
  type Reading,
  readRecordFor,
  sameBody,
} from "../../../agent/read-record.ts"
import { blobId } from "../../../repo/git/git.ts"
import {
  seatWarrantsWithDefaults,
  subagentWarrantsFor,
} from "../../../agent/required-reading/required-reading.ts"
import { seatAbove } from "../../../agent/writer.ts"
import { textAt } from "../../../page/text/text.ts"
import { standingHere } from "../../../page/required-reading/warrant/warrant.ts"
import { refusalText } from "../../../refusal/refusal.ts"
import type { Act, Batch, Check, CheckFailure } from "../check-shape.ts"

const SLUG = "read-what-is-required"

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
 * The check, given how it reads a file's text.
 *
 * HANDED RATHER THAN IMPORTED SO NOTHING HAS TO MOCK THE MODULE TO STAND FILES SOMEWHERE ELSE.
 * `mock.module` is process-global and mutates the namespace object in place, and `mock.restore()`
 * leaves the replacement standing, so a test that mocks `page/text/text.ts` leaves every other test
 * file in the same run reading through its stub. Taking the reader as an argument keeps a
 * substitution to the caller that made it.
 */
export function readWhatIsRequiredWith(
  readText: typeof textAt,
  defaults?: ReadonlyMap<string, string>
): Check {
  return {
    slug: SLUG,
    needs: "tree",
    needsAuthor: true,
    run: ({ paths }: Batch, act: Act): readonly CheckFailure[] => {
      const first = paths[0]
      if (first === undefined) return []
      if (act.writer === null) {
        return [{ path: first, reason: refusalText("writer-unidentified", {}) }]
      }
      const log = readRecordFor(act.writer)
      if (log === null) {
        return [
          { path: first, reason: refusalText("agent-page-absent", { agent: act.writer, lapsed: LAPSED }) },
        ]
      }
      const above = seatAbove(act.writer)
      const seat = above === null ? log.page : agentPageFor(above)
      if (seat === null) {
        const agent = above ?? act.writer
        return [{ path: first, reason: refusalText("agent-page-absent", { agent, lapsed: LAPSED }) }]
      }
      const { index, rootOf } = standingHere()
      const body = readText("", seat.slice(1))
      if (body === null) return []
      const warranted =
        above === null
          ? seatWarrantsWithDefaults(body, index, defaults)
          : subagentWarrantsFor(body, index, defaults)
      const failures: CheckFailure[] = []
      for (const one of warranted) {
        const root = rootOf(one.page.repo)
        if (root === undefined) continue
        const absolute = `${root}/${one.page.key}`
        const held = readText(root, one.page.key)
        if (held === null) continue
        const said = refusalOver(log.reading(absolute), held, one.page.key, absolute)
        if (said !== null) failures.push({ path: seat, reason: said })
      }
      return failures
    },
  }
}

export const readWhatIsRequired: Check = readWhatIsRequiredWith(textAt)

export default readWhatIsRequired
