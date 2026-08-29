import { readFileSync } from "node:fs"
import { isAbsolute, join, relative, resolve } from "node:path"
import type { Judged, Judging } from "../../../checks-system/judging.module.code.ts"
import type { Answer, Given } from "../../calling.module.code.ts"
import type { Change, Landed } from "../../landing.module.code.ts"
import {
  baseOf,
  bodyAt,
  CHECKING_AT,
  gateBuilt,
  holding,
  landing,
  leavingOf,
  NO_GATE,
} from "../../landing.module.code.ts"

export const FILE_PATH = "--file-path"

export const MESSAGE = "--message"

export const MESSAGE_FILE = "--message-file"

export const DRY_RUN = "--dry-run"

export const BREAK_GLASS = "--break-the-glass"

const CONTENT_FILE = "--content-file"

const REMOVE = "--remove"

const AKASHA = "akasha"

const NOTHING = "nothing was judged and nothing was written"

const VALUED = [FILE_PATH, CONTENT_FILE, REMOVE, MESSAGE, MESSAGE_FILE, BREAK_GLASS]

const BARE = [DRY_RUN]

export type Held = {
  readonly path: string
  readonly was: Uint8Array
}

export type Saying = (said: Landed) => readonly string[]

export type Asked = {
  readonly changes: readonly Change[]
  readonly message: string
  readonly dryRun: boolean
  readonly glass: string | null
  readonly unmoved: readonly Held[]
  readonly saying: Saying
}

export type Trouble = {
  readonly mistaken: readonly string[]
  readonly wrong: readonly string[]
}

export function mistaking(said: readonly string[]): Answer {
  return { report: [], refusals: said, code: 1 }
}

export function troubling(found: Trouble): Answer | null {
  const said = [...found.mistaken, ...found.wrong]
  if (said.length === 0) return null
  return { report: [], refusals: [...said, NOTHING], code: found.mistaken.length > 0 ? 1 : 2 }
}

export function bytesAt(at: string): Uint8Array | null {
  try {
    return readFileSync(at)
  } catch {
    return null
  }
}

export function textOf(bytes: Uint8Array): string | null {
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes)
  } catch {
    return null
  }
}

export function textAt(at: string): string | null {
  const bytes = bytesAt(at)
  return bytes === null ? null : textOf(bytes)
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

export function valuesOf(argv: readonly string[], flag: string, valued: readonly string[]): readonly (string | null)[] {
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
    return { refusals: [`${BREAK_GLASS} is given ${said.length} times, and one call bypasses once`] }
  }
  const one = said[0]
  if (one === undefined || one === null || one.trim() === "") {
    return { refusals: [`${BREAK_GLASS} takes the reason no check is to run, and this one is empty`] }
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
  if (said.length > 1) refusals.push(`${MESSAGE} is given ${said.length} times, and one commit carries one message`)
  if (from.length > 1) refusals.push(`${MESSAGE_FILE} is given ${from.length} times, and one commit carries one message`)
  if (said.length > 0 && from.length > 0) {
    refusals.push(`${MESSAGE} and ${MESSAGE_FILE} each carry the message, and both are given`)
  }
  const one = said[0]
  const two = from[0]
  if (one === null) refusals.push(`${MESSAGE} takes the commit message, and none follows it`)
  if (two === null) refusals.push(`${MESSAGE_FILE} takes a file to read the message from, and none follows it`)
  if (refusals.length > 0) return { refusals }
  let message: string | null = null
  if (typeof one === "string") message = one.trim()
  if (typeof two === "string") {
    const read = textAt(two)
    if (read === null) return { refusals: [`${MESSAGE_FILE} ${two} could not be read as text`] }
    message = read.trim()
  }
  if (message === "") return { refusals: ["the message given is empty, and a commit says what it is for"] }
  return { message }
}

export function defaultMessage(what: string, paths: readonly string[]): string {
  if (paths.length <= 3) return `${what} ${[...paths].sort().join(", ")}`
  return `${what} ${paths.length} files`
}

function sameBytes(one: Uint8Array | null, two: Uint8Array): boolean {
  if (one === null || one.byteLength !== two.byteLength) return false
  for (let at = 0; at < one.byteLength; at += 1) {
    if (one[at] !== two[at]) return false
  }
  return true
}

function alsoUnmoved(judging: Judging, held: readonly Held[]): Judging {
  return {
    named: judging.named,
    over: (leaving) => {
      const moved: Judged[] = []
      for (const one of held) {
        if (sameBytes(bytesAt(join(leaving.root, one.path)), one.was)) continue
        moved.push({
          path: one.path,
          reason:
            "changed after this call read it, so the body worked out for it is not the body on disk — run it again",
        })
      }
      return moved.length > 0 ? moved : judging.over(leaving)
    },
  }
}

export function unloadable(why: string): Answer {
  return {
    report: [],
    refusals: [
      `the checks could not be loaded from ${CHECKING_AT}, so no check could run — ${why}`,
      `${NOTHING} — say \`${BREAK_GLASS} <reason>\` to land without the checks, and both the reason and this stand in the commit`,
    ],
    code: 3,
  }
}

function gateFor(asked: Asked, held: Judging): Judging {
  return asked.unmoved.length === 0 ? held : alsoUnmoved(held, asked.unmoved)
}

function messageWith(asked: Asked, broken: string | null): string {
  if (asked.glass === null) return asked.message
  const held = `${asked.message}\n\nChecks-bypassed: ${asked.glass}`
  return broken === null ? held : `${held}\nChecks-unloadable: ${broken}`
}

function reportOf(
  said: Landed,
  asked: Asked,
  broken: string | null,
  checks: number
): readonly string[] {
  const found = [...asked.saying(said)]
  if (asked.glass === null) {
    found.push(judgedBy(checks, asked.changes.length))
  } else {
    found.push(`no check ran — the glass was broken for: ${asked.glass}`)
    if (broken !== null) {
      found.push(
        `the checks could not be loaded from ${CHECKING_AT} either, so none could have run — ${broken}`
      )
    }
  }
  found.push(...said.noted.map((one) => `the index took less than the whole of this — ${one}`))
  found.push(
    said.commit === null
      ? "nothing was committed — what was asked for already stands"
      : `committed as ${said.commit}`
  )
  return found
}

export function wroteAndTook(said: Landed): readonly string[] {
  return [
    ...said.wrote.map((one) => `wrote ${one}`),
    ...said.took.map((one) => `took away ${one}`),
  ]
}

export function counted(many: number, one: string): string {
  return `${many} ${one}${many === 1 ? "" : "s"}`
}

export function passedOver(checks: number, paths: number): string {
  if (checks === 0) {
    return `no check runs at this phase, so the ${counted(paths, "path")} asked for went unjudged`
  }
  return `${counted(checks, "check")} passed over the ${counted(paths, "path")} asked for`
}

export function judgedBy(checks: number, paths: number): string {
  if (checks === 0) {
    return `no check runs at this phase, so the ${counted(paths, "path")} asked for landed unjudged`
  }
  return `${counted(checks, "check")} judged the ${counted(paths, "path")} asked for, and none refused`
}

function reporting(root: string, asked: Asked, gate: Judging): Answer {
  const said = holding(root, () =>
    gate.over(leavingOf(root, { base: baseOf(root), changed: asked.changes }))
  )
  if (said.length > 0) {
    return {
      report: [],
      refusals: [
        ...said.map((one) => `${one.path} — ${one.reason}`),
        `nothing was written — ${DRY_RUN} writes nothing either way`,
      ],
      code: 3,
    }
  }
  return {
    report: [
      passedOver(gate.named.length, asked.changes.length),
      `nothing was written — ${DRY_RUN}`,
    ],
    refusals: [],
    code: 0,
  }
}

export function landingAsked(given: Given, asked: Asked): Answer {
  if (asked.dryRun && asked.glass !== null) {
    return mistaking([
      `${DRY_RUN} reports what the checks say and ${BREAK_GLASS} runs none, so together they report nothing`,
    ])
  }
  const built = gateBuilt(given.root)
  if ("broken" in built && asked.glass === null) return unloadable(built.broken)
  const broken = "broken" in built ? built.broken : null
  const gate = gateFor(asked, asked.glass === null && "gate" in built ? built.gate : NO_GATE)
  if (asked.dryRun) return reporting(given.root, asked, gate)
  const said = landing(given.root, asked.changes, messageWith(asked, broken), gate, given.writer)
  if ("refusals" in said) return { report: [], refusals: said.refusals, code: 3 }
  return { report: reportOf(said, asked, broken, gate.named.length), refusals: [], code: 0 }
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
        refusals.push(`${FILE_PATH} ${open} is closed by no ${CONTENT_FILE} before the next ${FILE_PATH}`)
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
      mistaken.push(`${CONTENT_FILE} ${one.from} could not be read, so ${path} has no body to write`)
      continue
    }
    changes.push({ path, body })
  }
  const base = read.removals.length === 0 ? null : baseOf(given.root)
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
    changes.push({ path, body: null })
  }
  const troubled = troubling({ mistaken, wrong })
  if (troubled !== null) return troubled

  return landingAsked(given, {
    changes,
    message: said.message ?? defaultMessage("write", changes.map((one) => one.path)),
    dryRun: argv.includes(DRY_RUN),
    glass: glass.glass,
    unmoved: [],
    saying: wroteAndTook,
  })
}
