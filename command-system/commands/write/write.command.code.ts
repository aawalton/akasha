import { existsSync, statSync } from "node:fs"
import { isAbsolute, join, relative, resolve } from "node:path"
import { changingOf, owedIn } from "@akasha/context/warranting"
import { besideAll } from "@akasha/pages-system/page-beside"
import {
  BREAK_GLASS,
  bytesAt,
  DRAFT,
  landedMechanically,
  landingAsked,
  mistaking,
  textAt,
  textOf,
  troubling,
  wroteAndTook,
} from "../../asking/asking.module.code.ts"
import type { Answer, Given } from "../../calling/calling.module.code.ts"
import { bodyAt } from "../../commit-reading/commit-reading.module.code.ts"
import type { FileEdit } from "../../landing/landing.module.code.ts"
import { baseOf } from "../../landing/landing.module.code.ts"
import type { Piping } from "../../piping/piping.module.code.ts"
import { inputIn, markingIn, pipedIn, RUNS_SAID } from "../../piping/piping.module.code.ts"
import { dropReadings } from "../../reading/reading.module.code.ts"

export const FILE_PATH = "--file-path"

export const MESSAGE = "--message"

export const MESSAGE_FILE = "--message-file"

export const CONTENT_FILE = "--content-file"

export const REMOVE = "--remove"

export const GIT_DIR = ".git"

const PARTED_BY = "/"

export const VALUED = [FILE_PATH, CONTENT_FILE, REMOVE, MESSAGE, MESSAGE_FILE, BREAK_GLASS]

const BARE = [DRAFT]

export function unwarrantedIn(
  given: Given,
  glass: string | null,
  changes: readonly FileEdit[]
): readonly string[] {
  if (given.changeKind?.runsWarrants === false) return []
  if (glass !== null) return []
  return owedIn(
    given.root,
    given.agentId,
    changes.map((one) => one.path),
    changingOf(given.root, changes)
  )
}

export function pathAt(root: string, said: string): string | null {
  const full = isAbsolute(said) ? resolve(said) : resolve(root, said)
  const rel = relative(resolve(root), full)
  if (rel === "" || isAbsolute(rel) || rel.startsWith("..")) return null
  return rel
}

export function offRepo(said: string): string {
  return (
    `\`${said}\` is no path inside the repository — a path is read against the repository root, ` +
    "and this takes nothing from outside the repository"
  )
}

export function barredIn(root: string, path: string): string | null {
  if (path === GIT_DIR || path.startsWith(`${GIT_DIR}${PARTED_BY}`)) {
    return (
      `${path} is inside \`${GIT_DIR}/\`, which holds the repository itself rather than ` +
      "anything the repository says"
    )
  }
  if (path.includes(PARTED_BY)) return null
  const at = join(root, path)
  if (!existsSync(at) || !statSync(at).isDirectory()) return null
  return (
    `${path} is a folder at the top of the repository — name what is inside it, so no one call ` +
    "takes a whole tree away by a slip of the keyboard"
  )
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

export type Removing = {
  readonly changes: readonly FileEdit[]
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
  const changes: FileEdit[] = []
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
    changes.push({ path, body: null })
  }
  return { changes, taken, base, mistaken, wrong }
}

export function besideTaken(
  given: Given,
  base: string | null,
  taken: readonly string[],
  seen: Set<string>
): readonly FileEdit[] {
  if (base === null) return []
  const changes: FileEdit[] = []
  for (const one of besideAll(resolve(given.root), taken)) {
    if (seen.has(one)) continue
    seen.add(one)
    changes.push({ path: one, body: null })
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
  readonly changes: readonly FileEdit[]
  readonly message: string
  readonly glass: string | null
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

  let piped: Uint8Array | null = null
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
      if (body !== null && markingIn(body)) {
        return mistaking([
          `the body piped in holds a line beginning with ${RUNS_SAID}, and a body like that` +
            ` is handed in at ${CONTENT_FILE} rather than piped in`,
        ])
      }
      piped = held.bytes
    }
  }

  const mistaken: string[] = []
  const wrong: string[] = []
  const changes: FileEdit[] = []
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
      changes.push({ path, body: piped ?? new Uint8Array() })
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
    changes.push({ path, body: held.bytes })
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
  wrong.push(...unwarrantedIn(given, glass.glass, changes))
  changes.push(...besideTaken(given, removing.base, removing.taken, seen))
  const troubled = troubling({ mistaken, wrong })
  if (troubled !== null) return troubled
  return {
    changes,
    message:
      said.message ??
      defaultMessage(
        "write",
        changes.map((one) => one.path)
      ),
    glass: glass.glass,
  }
}

export async function writing(
  argv: readonly string[],
  given: Given,
  piping: Piping
): Promise<Answer> {
  const built = builtIn(argv, given, piping)
  if ("code" in built) return built
  const draft = argv.includes(DRAFT)
  const answer = await landingAsked(given, {
    changes: built.changes,
    message: built.message,
    dryRun: false,
    glass: built.glass,
    unmoved: [],
    saying: (landed) => wroteAndTook(landed),
    draft,
  })
  if (answer.code === 0 && !draft) {
    dropReadings(
      given.root,
      built.changes.filter((one) => one.body === null).map((one) => one.path)
    )
  }
  return answer
}

export async function filing(
  argv: readonly string[],
  given: Given,
  piping: Piping
): Promise<Answer> {
  const built = builtIn(argv, given, piping)
  if ("code" in built) return built
  return await landedMechanically(given.root, given.calledAs, built.changes, built.message)
}

export async function write(argv: readonly string[], given: Given): Promise<Answer> {
  return await writing(argv, given, inputIn)
}
