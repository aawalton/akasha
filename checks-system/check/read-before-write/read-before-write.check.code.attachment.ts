import { statSync } from "node:fs"
import { relative } from "node:path"
import {
  bodyItself,
  type ReadRecord,
  readRecordFor,
  type Reading,
  sameBody,
} from "../../../agent/read-record.ts"
import { blobId } from "../../../repo/git/git.ts"
import { AKASHA } from "../../../repo/roots/roots.ts"
import type { PageAt } from "../../../page/page.ts"
import { pageNameOf } from "../../../page/name/name.ts"
import { requiredReadingFor } from "../../../page/required-reading/required-reading.ts"
import { textAt } from "../../../page/text/text.ts"
import { standingHere } from "../../../page/required-reading/warrant/warrant.ts"
import type { Act, Batch, Check, CheckFailure } from "../check-shape.ts"
import { refusalText } from "../../../refusal/refusal.ts"

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

function ownBody(log: ReadRecord, absolute: string): Reading | null {
  return log.reading(absolute)
}

function refusalOverTarget(
  log: ReadRecord,
  reading: Reading | null,
  body: Uint8Array,
  said: string,
  absolute: string
): string | null {
  const route = routeTo(absolute)
  if (reading === null) {
    const replaced = log.replaced
    if (replaced !== null && log.expired(absolute)) {
      return refusalText("file-read-expired", {
        path: said,
        when: whenText(replaced.at),
        source: replaced.source,
        route,
      })
    }
    return refusalText("file-never-read", { path: said, route })
  }
  const oid = blobId(body)
  if (!bodyItself(reading, oid)) {
    return refusalText(
      sameBody(reading, oid) ? "body-moved-mechanically" : "file-changed-after-read",
      { path: said, route }
    )
  }
  return null
}

function refusalOverRequired(
  reading: Reading | null,
  body: Uint8Array,
  said: string,
  absolute: string
): string | null {
  const route = routeTo(absolute)
  if (reading === null) return refusalText("required-document-unread", { path: said, owed: OWED, route })
  const oid = blobId(body)
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

export const readBeforeWrite: Check = {
  slug: SLUG,
  needs: "tree",
  needsAuthor: true,
  run: ({ root, paths, tree }: Batch, act: Act): readonly CheckFailure[] => {
    if (paths.length === 0) return []
    if (act.writer === null) {
      return paths.map((path) => ({ path, reason: refusalText("writer-unidentified", {}) }))
    }
    const log = readRecordFor(act.writer)
    if (log === null) {
      const reason = refusalText("agent-page-absent", {
        agent: act.writer,
        lapsed:
          "nothing can say what you have seen of the file you are writing, and a change landing " +
          "on top of work someone else did would go through with nothing saying so",
      })
      return paths.map((path) => ({ path, reason }))
    }

    const { index, naming, rootOf } = standingHere()
    const warrants = (at: PageAt, text: string | null): readonly PageAt[] =>
      requiredReadingFor(at, text, index, naming, rootOf)
    const failures: CheckFailure[] = []
    const judged = new Set<string>()

    for (const path of paths) {
      const key = relative(root, path)
      const before = act.before.at(path)
      if (before !== null) {
        const said = refusalOverTarget(log, ownBody(log, path), before, key, path)
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
