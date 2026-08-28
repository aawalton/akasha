import { readFileSync, statSync } from "node:fs"
import { bodyItself, type ReadRecord, readRecordFor, type Reading, sameBody } from "../read-record.ts"
import { blobId } from "../../repo/git/git.ts"
import { AKASHA } from "../../repo/roots/roots.ts"
import type { PageAt } from "../../page/page.ts"
import { pageNameOf } from "../../page/name/name.ts"
import { requiredReadingFor } from "../../page/required-reading/required-reading.ts"
import { textAt } from "../../page/text/text.ts"
import { standingHere } from "../../page/required-reading/warrant/warrant.ts"
import { refusalText } from "../../refusal/refusal.ts"

const OWED = "for this path"

/** One file a write would land: where it goes, and the body it would end at. */
export interface Writing {
  readonly relPath: string
  readonly body: string | Uint8Array
}

/** How a body already on disk is reached, so a fixture tree can stand somewhere else. */
export type BodyOnDisk = (absolute: string) => Uint8Array | null

function fromDisk(absolute: string): Uint8Array | null {
  try {
    return readFileSync(absolute)
  } catch {
    return null
  }
}

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

function bytesOf(body: string | Uint8Array): Uint8Array {
  return typeof body === "string" ? new TextEncoder().encode(body) : body
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

/**
 * What this write stands on and its author has not read, as refusal lines.
 *
 * A FILE NOT THERE YET HAS NO BODY TO HAVE BEEN READ, and what it warrants is judged still.
 *
 * A BODY EQUAL TO WHAT STANDS IS NOT JUDGED. Nothing about the file changes, so there is no work
 * this could be landing on top of, and nothing the new text could newly warrant.
 *
 * EVERY WARRANT IS JUDGED ONCE FOR THE WHOLE CHANGE rather than once for each file naming it.
 *
 * HANDED HOW IT READS A FILE SO NOTHING HAS TO MOCK A MODULE TO STAND FILES SOMEWHERE ELSE.
 * `mock.module` is process-global and mutates the namespace object in place, and `mock.restore()`
 * leaves the replacement standing, so a test mocking `page/text/text.ts` leaves every other test
 * file in the same run reading through its stub.
 */
export function unreadBeforeWriteWith(
  bodyOnDisk: BodyOnDisk,
  readText: typeof textAt
): (root: string, writing: readonly Writing[], writer: string | null) => readonly string[] {
  return (root, writing, writer) => {
    if (writing.length === 0) return []
    if (writer === null) {
      const why = refusalText("writer-unidentified", {})
      return writing.map((one) => `${one.relPath} — ${why}`)
    }
    const log = readRecordFor(writer)
    if (log === null) {
      const why = refusalText("agent-page-absent", {
        agent: writer,
        lapsed:
          "nothing can say what you have seen of the file you are writing, and a change landing " +
          "on top of work someone else did would go through with nothing saying so",
      })
      return writing.map((one) => `${one.relPath} — ${why}`)
    }

    const { index, naming, rootOf } = standingHere()
    const warrants = (at: PageAt, text: string | null): readonly PageAt[] =>
      requiredReadingFor(at, text, index, naming, rootOf)
    const said: string[] = []
    const judged = new Set<string>()

    for (const one of writing) {
      const absolute = `${root}/${one.relPath}`
      const landing = bytesOf(one.body)
      const before = bodyOnDisk(absolute)
      if (before !== null) {
        if (blobId(before) === blobId(landing)) continue
        const why = refusalOverTarget(log, log.reading(absolute), before, one.relPath, absolute)
        if (why !== null) said.push(`${one.relPath} — ${why}`)
      }
      const text = Buffer.from(landing).toString("utf8")
      for (const warrant of warrants(pageAtOf(AKASHA, one.relPath), text)) {
        const under = rootOf(warrant.repo)
        if (under === undefined) continue
        const at = `${under}/${warrant.key}`
        if (judged.has(at)) continue
        judged.add(at)
        const body = readText(under, warrant.key)
        if (body === null) continue
        const why = refusalOverRequired(
          log.reading(at),
          new TextEncoder().encode(body),
          warrant.key,
          at
        )
        if (why !== null) said.push(`${one.relPath} — ${why}`)
      }
    }
    return said
  }
}

export const unreadBeforeWrite = unreadBeforeWriteWith(fromDisk, textAt)
