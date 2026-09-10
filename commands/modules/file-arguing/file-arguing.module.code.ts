import { existsSync } from "node:fs"
import { join, resolve } from "node:path"
import { fileKeysAt } from "@akasha/indexes/entries"
import { besideAll } from "@akasha/pages/page-beside"
import type { FileChange } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import { notUtf8 } from "akasha/checks/modules/body-not-utf8/body-not-utf8.module.code.ts"
import { BREAK_GLASS, bytesAt, mistaking, textOf, troubling } from "../asking/asking.module.code.ts"
import { type Answer, type Given, kindNamed } from "../calling/calling.module.code.ts"
import { bodyAt } from "../commit-reading/commit-reading.module.code.ts"
import {
  CONTENT_FILE,
  FILE_PATH,
  glassIn,
  MESSAGE,
  MESSAGE_FILE,
  messageIn,
  REMOVE,
  unknownIn,
} from "../flags/command-flags.module.code.ts"
import { baseOf } from "../landing/landing.module.code.ts"
import { defaultMessage } from "../landing-saying/landing-saying.module.code.ts"
import type { Piping } from "../piping/piping.module.code.ts"
import { markingIn, pipedIn, RUNS_SAID } from "../piping/piping.module.code.ts"
import { unrestatedIn } from "../restating/restating.module.code.ts"
import { barredIn, offRepo, pathAt } from "../said-pathing/said-pathing.module.code.ts"
import { unwarrantedIn } from "../warrant-owing/warrant-owing.module.code.ts"

export const RESTATED = "--restated"

export const RESTATED_KIND = "change-restated"

export const VALUED = [FILE_PATH, CONTENT_FILE, REMOVE, MESSAGE, MESSAGE_FILE, BREAK_GLASS]

const BARE: readonly string[] = [RESTATED]

const PIPED_IN = "the body piped in"

const BYTES = new TextEncoder()

export function restatedIn(
  argv: readonly string[],
  given: Given
): { readonly given: Given } | { readonly refusals: readonly string[] } {
  if (!argv.includes(RESTATED)) return { given }
  const kind = kindNamed(given.root, RESTATED_KIND)
  if (kind === null) {
    return {
      refusals: [
        `${RESTATED} lands a \`${RESTATED_KIND}\` change, and no such kind is a page here`,
      ],
    }
  }
  return { given: { ...given, changeKind: kind } }
}

function wasAt(root: string, path: string): Uint8Array | null {
  const held = bytesAt(join(root, path))
  return "bytes" in held ? held.bytes : null
}

export function pathIn(one: FileChange): string {
  return one.kind === "move" ? one.pathTo : one.path
}

function bodyIn(one: FileChange): Uint8Array | null {
  if (one.kind === "add") return BYTES.encode(one.content)
  return one.kind === "replace" ? BYTES.encode(one.contentTo) : null
}

export function unrestatedFor(given: Given, changes: readonly FileChange[]): readonly string[] {
  if (given.changeKind?.slug !== RESTATED_KIND) return []
  return unrestatedIn(
    given.root,
    changes.map((one) => ({
      path: pathIn(one),
      was: wasAt(given.root, pathIn(one)),
      now: bodyIn(one),
    }))
  )
}

export type Removing = {
  readonly changes: readonly FileChange[]
  readonly taken: readonly string[]
  readonly base: string | null
  readonly mistaken: readonly string[]
  readonly wrong: readonly string[]
}

export function removingIn(
  given: Given,
  removals: readonly string[],
  seen: Set<string>,
  both: (path: string) => string
): Removing {
  const base = removals.length === 0 ? null : baseOf(given.root)
  const changes: FileChange[] = []
  const taken: string[] = []
  const mistaken: string[] = []
  const wrong: string[] = []
  for (const one of removals) {
    const path = pathAt(given.root, one)
    if (path === null) {
      mistaken.push(offRepo(one))
      continue
    }
    if (seen.has(path)) {
      mistaken.push(both(path))
      continue
    }
    seen.add(path)
    if (
      base !== null &&
      bodyAt(given.root, base, path) === null &&
      !existsSync(join(given.root, path))
    ) {
      wrong.push(`${REMOVE} ${path} is not there, so the removal would take nothing away`)
      continue
    }
    taken.push(path)
    changes.push({ kind: "remove", path })
  }
  return { changes, taken, base, mistaken, wrong }
}

export function besideTaken(
  given: Given,
  base: string | null,
  taken: readonly string[],
  seen: Set<string>
): readonly FileChange[] {
  if (base === null) return []
  const root = resolve(given.root)
  const changes: FileChange[] = []
  for (const one of besideAll(root, taken, new Set(fileKeysAt(root).keys()))) {
    if (seen.has(one)) continue
    seen.add(one)
    changes.push({ kind: "remove", path: one })
  }
  return changes
}

type Pair = {
  readonly path: string
  readonly from: string | null
}

type Read = {
  readonly pairs: readonly Pair[]
  readonly removals: readonly string[]
  readonly refusals: readonly string[]
}

function readIn(argv: readonly string[]): Read {
  const pairs: Pair[] = []
  const removals: string[] = []
  const refusals: string[] = []
  let open: string | null = null
  for (let at = 0; at < argv.length; at += 1) {
    const token = argv[at]
    if (token === undefined) continue
    if (token === FILE_PATH) {
      const value = argv[at + 1]
      if (value === undefined) {
        refusals.push(`${FILE_PATH} takes a path, and none follows it`)
        break
      }
      if (open !== null) {
        refusals.push(
          `${FILE_PATH} ${open} is closed by no ${CONTENT_FILE} before the next ${FILE_PATH}`
        )
      }
      open = value
      at += 1
      continue
    }
    if (token === CONTENT_FILE) {
      const value = argv[at + 1]
      if (value === undefined) {
        refusals.push(`${CONTENT_FILE} takes a file, and none follows it`)
        break
      }
      if (open === null) refusals.push(`${CONTENT_FILE} ${value} follows no ${FILE_PATH}`)
      else pairs.push({ path: open, from: value })
      open = null
      at += 1
      continue
    }
    if (token === REMOVE) {
      const value = argv[at + 1]
      if (value === undefined) {
        refusals.push(`${REMOVE} takes a path, and none follows it`)
        break
      }
      removals.push(value)
      at += 1
      continue
    }
    if (VALUED.includes(token)) at += 1
  }
  if (open !== null) pairs.push({ path: open, from: null })
  return { pairs, removals, refusals }
}

export type Built = {
  readonly changes: readonly FileChange[]
  readonly message: string
}

export function builtIn(argv: readonly string[], given: Given, piping: Piping): Built | Answer {
  const unknown = unknownIn(argv, VALUED, BARE)
  if (unknown.length > 0) return mistaking(unknown)
  const read = readIn(argv)
  if (read.refusals.length > 0) return mistaking(read.refusals)
  if (read.pairs.length === 0 && read.removals.length === 0) {
    return mistaking([
      `this call names no ${FILE_PATH} to write and no ${REMOVE} to take away, so it asks for nothing`,
    ])
  }
  const glass = glassIn(argv, VALUED)
  if ("refusals" in glass) return mistaking(glass.refusals)
  const said = messageIn(argv, VALUED)
  if ("refusals" in said) return mistaking(said.refusals)

  let piped: string | null = null
  if (read.pairs.length > 0) {
    const wanted = read.pairs.find((one) => one.from === null)?.path ?? null
    const held = pipedIn(piping, wanted, {
      bare: (path) =>
        `${FILE_PATH} ${path} names no ${CONTENT_FILE}, so its body is read from the input,` +
        ` and nothing is piped in — say it as` +
        ` \`${given.calledAs} ${FILE_PATH} ${path} ${MESSAGE} <text> <<'EOF'\`,` +
        " then the body, then `EOF` on a line of its own",
      opening: (path, why) =>
        `the body for ${path} is read from the input, and the input would not open — ${why}`,
    })
    if ("refusals" in held) return mistaking(held.refusals)
    if ("bytes" in held) {
      const body = textOf(held.bytes)
      if (body === null) return mistaking([notUtf8(PIPED_IN, held.bytes)])
      if (markingIn(body)) {
        return mistaking([
          `${PIPED_IN} holds a line beginning with ${RUNS_SAID}, and a body like that` +
            ` is handed in at ${CONTENT_FILE} rather than piped in`,
        ])
      }
      piped = body
    }
  }

  const mistaken: string[] = []
  const wrong: string[] = []
  const changes: FileChange[] = []
  const seen = new Set<string>()
  for (const one of read.pairs) {
    const path = pathAt(given.root, one.path)
    if (path === null) {
      mistaken.push(offRepo(one.path))
      continue
    }
    const barred = barredIn(given.root, path)
    if (barred !== null) {
      mistaken.push(barred)
      continue
    }
    if (seen.has(path)) {
      mistaken.push(`${path} is named more than once by one call`)
      continue
    }
    seen.add(path)
    if (one.from === null) {
      changes.push({ kind: "add", path, content: piped ?? "" })
      continue
    }
    const held = bytesAt(one.from)
    if ("absent" in held) {
      mistaken.push(`${CONTENT_FILE} ${one.from} is not there, so ${path} has no body to write`)
      continue
    }
    if ("unreadable" in held) {
      mistaken.push(
        `${CONTENT_FILE} ${one.from} would not open, so ${path} has no body to write — ${held.unreadable}`
      )
      continue
    }
    const body = textOf(held.bytes)
    if (body === null) {
      mistaken.push(notUtf8(one.from, held.bytes))
      continue
    }
    changes.push({ kind: "add", path, content: body })
  }
  const removing = removingIn(
    given,
    read.removals,
    seen,
    (path) => `${path} is both written and taken away by one call`
  )
  changes.push(...removing.changes)
  mistaken.push(...removing.mistaken)
  wrong.push(...removing.wrong)
  wrong.push(...unwarrantedIn(given, changes))
  wrong.push(...unrestatedFor(given, changes))
  changes.push(...besideTaken(given, removing.base, removing.taken, seen))
  const troubled = troubling({ mistaken, wrong })
  if (troubled !== null) return troubled
  return {
    changes,
    message: said.message ?? defaultMessage("write", changes.map(pathIn)),
  }
}
