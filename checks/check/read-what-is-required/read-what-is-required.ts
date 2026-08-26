import { statSync } from "node:fs"
import {
  agentPageFor,
  blobId,
  countLines,
  firstUnreadLine,
  type Reading,
  readLogFor,
  sameBody,
} from "../../../agent/read-log.ts"
import { seatWarrantsFor } from "../../../agent/required-reading/required-reading.ts"
import { textAt } from "../../../page/text.ts"
import { standingHere } from "../../../page/warrant-index.ts"
import { refusalText } from "../../refusal/refusal.ts"
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
  const mark = blobId(new TextEncoder().encode(body))
  if (!sameBody(reading, mark)) {
    return refusalText("required-document-changed", {
      path: said,
      owed: OWED,
      read: whenText(reading.at),
      changed: changedAt(absolute),
      route,
    })
  }
  const lines = countLines(body)
  const unread = firstUnreadLine(reading, mark, lines)
  if (unread === null) return null
  return refusalText("required-document-part-read", {
    path: said,
    owed: OWED,
    line: `${unread}`,
    lines: `${lines}`,
    route,
  })
}

export const readWhatIsRequired: Check = {
  slug: SLUG,
  needs: "tree",
  needsAuthor: true,
  run: ({ paths }: Batch, act: Act): readonly CheckFailure[] => {
    const first = paths[0]
    if (first === undefined) return []
    if (act.writer === null) {
      return [{ path: first, reason: refusalText("writer-unidentified", {}) }]
    }
    const page = agentPageFor(act.writer)
    const log = page === null ? null : readLogFor(act.writer)
    if (page === null || log === null) {
      return [
        { path: first, reason: refusalText("agent-page-absent", { agent: act.writer, lapsed: LAPSED }) },
      ]
    }
    const { index, rootOf } = standingHere()
    const body = textAt("", page.slice(1))
    if (body === null) return []
    const failures: CheckFailure[] = []
    for (const one of seatWarrantsFor(body, index)) {
      const root = rootOf(one.page.repo)
      if (root === undefined) continue
      const absolute = `${root}/${one.page.key}`
      const held = textAt(root, one.page.key)
      if (held === null) continue
      const said = refusalOver(log.reading(absolute), held, one.page.key, absolute)
      if (said !== null) failures.push({ path: page, reason: said })
    }
    return failures
  },
}

export default readWhatIsRequired
