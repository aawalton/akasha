import { isAbsolute, relative, resolve } from "node:path"
import { unreadIn } from "../../../context-system/warranting/warranting.module.code.ts"
import { besideAll } from "../../../pages-system/page/page-beside/page-beside.module.code.ts"
import {
  BREAK_GLASS,
  bytesAt,
  DRY_RUN,
  landingAsked,
  mistaking,
  textAt,
  troubling,
  wroteAndTook,
} from "../../asking/asking.module.code.ts"
import type { Answer, Given } from "../../calling/calling.module.code.ts"
import type { Change } from "../../landing/landing.module.code.ts"
import { baseOf, bodyAt } from "../../landing/landing.module.code.ts"

export const FILE_PATH = "--file-path"

export const MESSAGE = "--message"

export const MESSAGE_FILE = "--message-file"

const CONTENT_FILE = "--content-file"

const REMOVE = "--remove"

const AKASHA = "akasha"

const VALUED = [FILE_PATH, CONTENT_FILE, REMOVE, MESSAGE, MESSAGE_FILE, BREAK_GLASS]

const BARE = [DRY_RUN]

export function unwarrantedIn(
  given: Given,
  glass: string | null,
  changes: readonly Change[]
): readonly string[] {
  if (glass !== null) return []
  return unreadIn(
    given.root,
    given.agentId,
    changes.map((one) => one.path)
  )
}

export function pathInside(root: string, said: string): string | null {
  const full = isAbsolute(said) ? resolve(said) : resolve(root, said)
  const rel = relative(resolve(root), full)
  if (isAbsolute(rel) || rel.startsWith("..")) return null
  if (!rel.startsWith(`${AKASHA}/`)) return null
  return rel
}

export function outside(said: string): string {
  return `${said} is not under \`${AKASHA}/\`, and this writes nothing the checks do not address`
}

export function valuesOf(
  argv: readonly string[],
  flag: string,
  valued: readonly string[]
): readonly (string | null)[] {
  const found: (string | null)[] = []
  for (let at = 0; at < argv.length; at += 1) {
    const one = argv[at]
    if (one === undefined) continue
    if (one === flag) {
      const value = argv[at + 1]
      found.push(value === undefined ? null : value)
      at += 1
      continue
    }
    if (valued.includes(one)) at += 1
  }
  return found
}

export function unknownIn(
  argv: readonly string[],
  valued: readonly string[],
  bare: readonly string[]
): readonly string[] {
  const said: string[] = []
  for (let at = 0; at < argv.length; at += 1) {
    const one = argv[at]
    if (one === undefined) continue
    if (valued.includes(one)) {
      at += 1
      continue
    }
    if (bare.includes(one)) continue
    said.push(`\`${one}\` is no flag this takes`)
  }
  return said
}

export function glassIn(
  argv: readonly string[],
  valued: readonly string[]
): { readonly glass: string | null } | { readonly refusals: readonly string[] } {
  const said = valuesOf(argv, BREAK_GLASS, valued)
  if (said.length === 0) return { glass: null }
  if (said.length > 1) {
    return {
      refusals: [`${BREAK_GLASS} is given ${said.length} times, and one call bypasses once`],
    }
  }
  const one = said[0]
  if (one === undefined || one === null || one.trim() === "") {
    return {
      refusals: [`${BREAK_GLASS} takes the reason no check is to run, and this one is empty`],
    }
  }
  return { glass: one.trim() }
}

export function messageIn(
  argv: readonly string[],
  valued: readonly string[]
): { readonly message: string | null } | { readonly refusals: readonly string[] } {
  const said = valuesOf(argv, MESSAGE, valued)
  const from = valuesOf(argv, MESSAGE_FILE, valued)
  const refusals: string[] = []
  if (said.length > 1)
    refusals.push(`${MESSAGE} is given ${said.length} times, and one commit carries one message`)
  if (from.length > 1)
    refusals.push(
      `${MESSAGE_FILE} is given ${from.length} times, and one commit carries one message`
    )
  if (said.length > 0 && from.length > 0) {
    refusals.push(`${MESSAGE} and ${MESSAGE_FILE} each carry the message, and both are given`)
  }
  const one = said[0]
  const two = from[0]
  if (one === null) refusals.push(`${MESSAGE} takes the commit message, and none follows it`)
  if (two === null)
    refusals.push(`${MESSAGE_FILE} takes a file to read the message from, and none follows it`)
  if (refusals.length > 0) return { refusals }
  let message: string | null = null
  if (typeof one === "string") message = one.trim()
  if (typeof two === "string") {
    const read = textAt(two)
    if (read === null) return { refusals: [`${MESSAGE_FILE} ${two} could not be read as text`] }
    message = read.trim()
  }
  if (message === "")
    return { refusals: ["the message given is empty, and a commit says what it is for"] }
  return { message }
}

export function defaultMessage(what: string, paths: readonly string[]): string {
  if (paths.length <= 3) return `${what} ${[...paths].sort().join(", ")}`
  return `${what} ${paths.length} files`
}

type Pair = {
  readonly path: string
  readonly from: string
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
  if (open !== null) refusals.push(`${FILE_PATH} ${open} is closed by no ${CONTENT_FILE}`)
  return { pairs, removals, refusals }
}

export function write(argv: readonly string[], given: Given): Answer {
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

  const mistaken: string[] = []
  const wrong: string[] = []
  const changes: Change[] = []
  const seen = new Set<string>()
  for (const one of read.pairs) {
    const path = pathInside(given.root, one.path)
    if (path === null) {
      mistaken.push(outside(one.path))
      continue
    }
    if (seen.has(path)) {
      mistaken.push(`${path} is named more than once by one call`)
      continue
    }
    seen.add(path)
    const body = bytesAt(one.from)
    if (body === null) {
      mistaken.push(
        `${CONTENT_FILE} ${one.from} could not be read, so ${path} has no body to write`
      )
      continue
    }
    changes.push({ path, body })
  }
  const base = read.removals.length === 0 ? null : baseOf(given.root)
  const taken: string[] = []
  for (const one of read.removals) {
    const path = pathInside(given.root, one)
    if (path === null) {
      mistaken.push(outside(one))
      continue
    }
    if (seen.has(path)) {
      mistaken.push(`${path} is both written and taken away by one call`)
      continue
    }
    seen.add(path)
    if (base !== null && bodyAt(given.root, base, path) === null) {
      wrong.push(`${REMOVE} ${path} is not there, so the removal would take nothing away`)
      continue
    }
    taken.push(path)
    changes.push({ path, body: null })
  }
  wrong.push(...unwarrantedIn(given, glass.glass, changes))
  if (base !== null) {
    for (const one of besideAll(resolve(given.root), taken)) {
      if (seen.has(one) || bodyAt(given.root, base, one) === null) continue
      seen.add(one)
      changes.push({ path: one, body: null })
    }
  }
  const troubled = troubling({ mistaken, wrong })
  if (troubled !== null) return troubled

  return landingAsked(given, {
    changes,
    message:
      said.message ??
      defaultMessage(
        "write",
        changes.map((one) => one.path)
      ),
    dryRun: argv.includes(DRY_RUN),
    glass: glass.glass,
    unmoved: [],
    saying: wroteAndTook,
  })
}
