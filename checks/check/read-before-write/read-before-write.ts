import { statSync } from "node:fs"
import { relative } from "node:path"
import {
  blobId,
  bodyItself,
  countLines,
  firstUnreadLine,
  type ReadLog,
  readLogFor,
  type Reading,
  sameBody,
} from "../../../agent/read-log.ts"
import { AKASHA } from "../../../repo/roots/roots.ts"
import type { PageAt } from "../../../page/page-at.ts"
import { pageNameOf } from "../../../page/page-name.ts"
import { requiredReadingFor } from "../../../page/required-reading.ts"
import { textAt } from "../../../page/text.ts"
import { standingHere } from "../../../page/warrant-index.ts"
import type { Act, Batch, Check, CheckFailure } from "../check-shape.ts"
import { refusalText } from "../../refusal/refusal.ts"

const SLUG = "read-before-write"

const OWED = "for this path"

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

function pageAtOf(repo: string, key: string): PageAt {
  const named = pageNameOf(key)
  return { repo, key, stem: named?.stem ?? "", type: named?.type ?? "" }
}

function ownBody(log: ReadLog, absolute: string): Reading | null {
  return log.reading(absolute)
}

function refusalOverTarget(
  reading: Reading | null,
  body: Uint8Array,
  said: string,
  absolute: string
): string | null {
  const route = routeTo(absolute)
  if (reading === null) return refusalText("file-never-read", { path: said, route })
  const mark = blobId(body)
  if (!bodyItself(reading, mark)) {
    return refusalText(
      sameBody(reading, mark) ? "body-moved-mechanically" : "file-changed-after-read",
      { path: said, route }
    )
  }
  const lines = countLines(new TextDecoder().decode(body))
  const unread = firstUnreadLine(reading, mark, lines)
  if (unread === null) return null
  return refusalText("file-part-read", { path: said, line: `${unread}`, route })
}

function refusalOverRequired(
  reading: Reading | null,
  body: Uint8Array,
  said: string,
  absolute: string
): string | null {
  const route = routeTo(absolute)
  if (reading === null) return refusalText("required-document-unread", { path: said, owed: OWED, route })
  const mark = blobId(body)
  if (!sameBody(reading, mark)) {
    return refusalText("required-document-changed", {
      path: said,
      owed: OWED,
      read: whenText(reading.at),
      changed: changedAt(absolute),
      route,
    })
  }
  const lines = countLines(new TextDecoder().decode(body))
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

export const readBeforeWrite: Check = {
  slug: SLUG,
  needs: "tree",
  needsAuthor: true,
  run: ({ root, paths, tree }: Batch, act: Act): readonly CheckFailure[] => {
    if (paths.length === 0) return []
    if (act.writer === null) {
      return paths.map((path) => ({ path, reason: refusalText("writer-unidentified", {}) }))
    }
    const log = readLogFor(act.writer)
    if (log === null) {
      const reason = refusalText("agent-page-absent", {
        agent: act.writer,
        lapsed:
          "nothing can say what you have seen of the file you are writing, and a change landing " +
          "on top of work someone else did would go through with nothing saying so",
      })
      return paths.map((path) => ({ path, reason }))
    }

    const { index, seeding, rootOf } = standingHere()
    const warrants = (at: PageAt, text: string | null): readonly PageAt[] =>
      requiredReadingFor(at, text, index, seeding, rootOf)
    const failures: CheckFailure[] = []
    const judged = new Set<string>()

    for (const path of paths) {
      const key = relative(root, path)
      const before = act.before.at(path)
      if (before !== null) {
        const said = refusalOverTarget(ownBody(log, path), before, key, path)
        if (said !== null) failures.push({ path, reason: said })
      }
      const landing = tree.at(path)
      const text = landing === null ? null : landing.toString("utf8")
      for (const one of warrants(pageAtOf(AKASHA, key), text)) {
        const root_ = rootOf(one.repo)
        if (root_ === undefined) continue
        const absolute = `${root_}/${one.key}`
        if (judged.has(absolute)) continue
        judged.add(absolute)
        const body = textAt(root_, one.key)
        if (body === null) continue
        const said = refusalOverRequired(
          ownBody(log, absolute),
          new TextEncoder().encode(body),
          one.key,
          absolute
        )
        if (said !== null) failures.push({ path, reason: said })
      }
    }
    return failures
  },
}

export default readBeforeWrite
