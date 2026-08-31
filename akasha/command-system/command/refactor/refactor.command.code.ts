import { existsSync } from "node:fs"
import { join, resolve } from "node:path"
import {
  exportedAs,
  typedAs,
} from "../../../pages-system/page/page-export-name/page-export-name.module.code.ts"
import { uncommittedNamed } from "../../../pages-system/page/page-file-name/page-file-name.module.code.ts"
import type { Asked } from "../../asking/asking.module.code.ts"
import {
  BREAK_GLASS,
  counted,
  DRY_RUN,
  landingAsked,
  textOf,
} from "../../asking/asking.module.code.ts"
import type { Answer, Given } from "../../calling/calling.module.code.ts"
import { answering } from "../../calling/calling.module.code.ts"
import { bodyAt } from "../../commit-reading/commit-reading.module.code.ts"
import type { FileCarry, FileEdit } from "../../landing/landing.module.code.ts"
import { baseOf } from "../../landing/landing.module.code.ts"
import type { Carry as Reading } from "../../reading/reading.module.code.ts"
import { blobIdOf, carryReadings } from "../../reading/reading.module.code.ts"
import { importingOf, spellingOf } from "../move/move.command.code.ts"
import { repointed } from "../move/move-repointing/move-repointing.module.code.ts"
import { glassIn, MESSAGE, MESSAGE_FILE, messageIn } from "../write/write.command.code.ts"
import type { Carry, Renaming } from "./type-renaming/type-renaming.module.code.ts"
import {
  carriesFor,
  pagesOf,
  renamingFor,
  restated,
} from "./type-renaming/type-renaming.module.code.ts"
import type { Spelling } from "./type-respelling/type-respelling.module.code.ts"
import { renamed, respelled, spellingOver } from "./type-respelling/type-respelling.module.code.ts"

const RENAME = "rename"

const PAGE_TYPE = "page-type"

const TS = ".ts"

const FROM = "--from"

const TO = "--to"

const PLURAL = "--plural"

const VALUED = [FROM, TO, PLURAL, MESSAGE, MESSAGE_FILE, BREAK_GLASS]

const NAMED = [FROM, TO, PLURAL]

const BYTES = new TextEncoder()

export type Read =
  | { readonly said: ReadonlyMap<string, string>; readonly dryRun: boolean }
  | { readonly refused: string }

export function flagsIn(argv: readonly string[]): Read {
  const said = new Map<string, string>()
  let dryRun = false
  let at = 0
  while (at < argv.length) {
    const token = argv[at]
    if (token === undefined) break
    if (token === DRY_RUN) {
      dryRun = true
      at = at + 1
      continue
    }
    if (!VALUED.includes(token)) {
      return { refused: `\`${token}\` is not a flag this takes — it takes ${NAMED.join(", ")}` }
    }
    const value = argv[at + 1]
    if (value === undefined) return { refused: `${token} needs a value, and the line ends` }
    if (said.has(token)) return { refused: `${token} is said more than once` }
    said.set(token, value)
    at = at + 2
  }
  return { said, dryRun }
}

type Rewriting = {
  readonly one: Renaming
  readonly moved: ReadonlyMap<string, string>
  readonly spelling: Spelling
  readonly pages: ReadonlySet<string>
}

function rewritten(held: Rewriting, from: string, to: string, text: string): string {
  const one = held.one
  const own = from === one.path
  let next = text
  const typed = renamed(from, next, typedAs(one.was), typedAs(one.now), own ? null : one.path)
  if (typed !== null) next = typed
  if (!own) {
    const value = renamed(from, next, exportedAs(one.was), exportedAs(one.now), one.path)
    if (value !== null) next = value
  }
  const spelled = held.spelling.get(from)
  if (spelled !== undefined) next = respelled(from, next, spelled.said, spelled.keys)
  const said = own
    ? new Map([
        ["slug", one.now],
        ["pluralSlug", one.plural],
      ])
    : held.pages.has(from)
      ? new Map([["pageTypeSlug", one.now]])
      : null
  if (said !== null) {
    const stated = restated(from, next, said, own ? one.now : null)
    if (stated !== null) next = stated
  }
  return repointed(from, to, next, held.moved)
}

function were(many: number, dry: boolean): string {
  return dry ? "would be" : many === 1 ? "was" : "were"
}

function saying(
  one: Renaming,
  carries: readonly Carry[],
  repointing: readonly string[],
  pages: number,
  dry: boolean
): readonly string[] {
  return [
    `\`${one.was}\` ${dry ? "would be renamed" : "was renamed"} to \`${one.now}\`, ` +
      `and its plural to \`${one.plural}\``,
    `${one.path} states it, and ${counted(pages, "page")} ${pages === 1 ? "is" : "are"} of it`,
    ...(dry ? carries.map((held) => `  ${held.from} -> ${held.to}`) : []),
    `${counted(carries.length, "file")} ${were(carries.length, dry)} carried`,
    repointing.length === 0
      ? "no file naming it needed repointing"
      : `${counted(repointing.length, "file")} naming it ${were(repointing.length, dry)} repointed`,
  ]
}

function unread(path: string, why: string): Answer {
  return answering([], [`${path} ${why}`], 2)
}

export function landed(
  given: Given,
  root: string,
  one: Renaming,
  dryRun: boolean,
  argv: readonly string[]
): Answer {
  const stood = baseOf(root)
  const bodyText = (path: string): string | null => {
    const bytes = bodyAt(root, stood, path)
    return bytes === null ? null : textOf(bytes)
  }
  const carries = carriesFor(root, one, (path) => existsSync(join(root, path)))
  const moved = new Map<string, string>(carries.map((held) => [held.from, held.to]))
  const held: Rewriting = {
    one,
    moved,
    spelling: spellingOver(root, one, bodyText),
    pages: new Set(pagesOf(root, one)),
  }
  const reading = importingOf(root, moved)
  if ("unread" in reading) return answering([], [reading.unread], 2)
  const naming = new Set<string>(reading.importers)
  for (const path of held.spelling.keys()) naming.add(path)
  for (const path of spellingOf(root, stood, moved, naming)) naming.add(path)
  const changes: FileEdit[] = []
  const readings: Reading[] = []
  const moving: FileCarry[] = []
  for (const carry of carries) {
    if (uncommittedNamed(carry.from)) {
      moving.push({ from: carry.from, to: carry.to })
      continue
    }
    const bytes = bodyAt(root, stood, carry.from)
    if (bytes === null) return unread(carry.from, `stands in no commit at \`${stood}\``)
    readings.push({ was: carry.from, now: carry.to, from: blobIdOf(bytes) })
    changes.push({ path: carry.from, body: null })
    if (!carry.from.endsWith(TS)) {
      changes.push({ path: carry.to, body: bytes, carried: true })
      continue
    }
    const text = textOf(bytes)
    if (text === null) return unread(carry.from, `is named \`${TS}\` and its bytes are not utf-8`)
    const body = BYTES.encode(rewritten(held, carry.from, carry.to, text))
    changes.push({ path: carry.to, body, carried: true })
  }
  const repointing: string[] = []
  for (const path of [...naming].sort()) {
    if (!path.endsWith(TS) || moved.has(path)) continue
    const bytes = bodyAt(root, stood, path)
    if (bytes === null) continue
    const text = textOf(bytes)
    if (text === null) return unread(path, `names what moved and its bytes are not utf-8`)
    const next = rewritten(held, path, path, text)
    if (next === text) continue
    repointing.push(path)
    readings.push({ was: path, now: path, from: blobIdOf(bytes) })
    changes.push({ path, body: BYTES.encode(next), carried: true })
  }
  const glass = glassIn(argv, VALUED)
  if ("refusals" in glass) return answering([], glass.refusals, 1)
  const message = messageIn(argv, VALUED)
  if ("refusals" in message) return answering([], message.refusals, 1)
  const pages = held.pages.size
  const asked: Asked = {
    changes,
    message: message.message ?? `rename the page type \`${one.was}\` to \`${one.now}\``,
    dryRun,
    glass: glass.glass,
    unmoved: [],
    read: stood,
    carries: moving,
    saying: () => saying(one, carries, repointing, pages, false),
  }
  const landing = landingAsked({ ...given, root }, asked)
  if (landing.code === 0 && !dryRun) carryReadings(root, readings)
  if (landing.code !== 0 || !dryRun) return landing
  return answering([...saying(one, carries, repointing, pages, true), ...landing.report], [], 0)
}

export function refactor(argv: readonly string[], given: Given): Answer {
  const [act, namespace, ...rest] = argv
  if (act === undefined) {
    return answering(
      [],
      [`this takes an act, and none was named — say \`${RENAME} ${PAGE_TYPE}\``],
      1
    )
  }
  if (act !== RENAME) {
    return answering([], [`\`${act}\` is no act this carries — it carries \`${RENAME}\``], 1)
  }
  if (namespace !== PAGE_TYPE) {
    const said = namespace === undefined ? "none was named" : `\`${namespace}\` is not one of them`
    return answering(
      [],
      [
        `${RENAME} names the namespace it is worked over, and ${said} — it carries \`${PAGE_TYPE}\``,
      ],
      1
    )
  }
  const read = flagsIn(rest)
  if ("refused" in read) return answering([], [read.refused], 1)
  const from = read.said.get(FROM)
  const to = read.said.get(TO)
  const plural = read.said.get(PLURAL)
  if (from === undefined || to === undefined || plural === undefined) {
    return answering(
      [],
      [`a page type rename takes ${FROM}, ${TO} and ${PLURAL}, and one of them was not said`],
      1
    )
  }
  const root = resolve(given.root)
  const stood = baseOf(root)
  const asked = renamingFor(root, from, to, plural, (path) => {
    const bytes = bodyAt(root, stood, path)
    return bytes === null ? null : textOf(bytes)
  })
  if ("refused" in asked) return answering([], [asked.refused], 1)
  return landed(given, root, asked.renaming, read.dryRun, argv)
}
