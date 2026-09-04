import { readFileSync } from "node:fs"
import { isAbsolute, resolve } from "node:path"
import type { Answer, Given } from "@akasha/command-system/calling"
import { whyOf } from "@akasha/command-system/fault-saying"
import type { Piping } from "@akasha/command-system/piping"
import { inputIn } from "@akasha/command-system/piping"
import { buildComposeInput } from "@akasha/google-email/compose-input-from-arguments"
import type { ComposeInput } from "@akasha/google-email/types"

export const INPUT = "-"

export const MESSAGE = "--message"

export const MAX = "--max"

export const TO = "--to"

export const CC = "--cc"

export const BCC = "--bcc"

export const SUBJECT = "--subject"

export const SUBJECT_FILE = "--subject-file"

export const BODY = "--body"

export const BODY_FILE = "--body-file"

export const ATTACH = "--attach"

export const THREAD = "--thread"

export const REPLY_TO = "--reply-to-message"

export const FROM = "--from"

const WHOLE_NUMBER = /^\d+$/

const TRAILING_LINES = /(?:\r?\n)+$/

export type Filing = {
  readonly said: string
  readonly file: string
  readonly whole: boolean
}

export type Taking = {
  readonly valued: readonly string[]
  readonly repeats?: readonly string[]
  readonly needed?: readonly string[]
  readonly named?: string
  readonly either?: readonly string[]
  readonly numbered?: readonly string[]
  readonly filing?: readonly Filing[]
}

export type Said = {
  readonly one: Readonly<Record<string, string>>
  readonly many: Readonly<Record<string, readonly string[]>>
}

export type Read = Said | { readonly refused: readonly string[] }

export const SUBJECT_FILING: Filing = { said: SUBJECT, file: SUBJECT_FILE, whole: false }

export const BODY_FILING: Filing = { said: BODY, file: BODY_FILE, whole: true }

export const COMPOSING: Taking = {
  valued: [SUBJECT, SUBJECT_FILE, BODY, BODY_FILE, THREAD, REPLY_TO, FROM],
  repeats: [TO, CC, BCC, ATTACH],
  needed: [TO, SUBJECT, BODY],
  filing: [SUBJECT_FILING, BODY_FILING],
}

export function spelled(said: readonly string[]): string {
  return said.map((one) => `\`${one}\``).join(", ")
}

function filingFor(taking: Taking, flag: string): Filing | undefined {
  return (taking.filing ?? []).find((one) => one.said === flag)
}

function unsaid(
  taking: Taking,
  one: Readonly<Record<string, string>>,
  many: Readonly<Record<string, readonly string[]>>,
  flag: string
): boolean {
  if (one[flag] !== undefined) return false
  if ((many[flag] ?? []).length > 0) return false
  const filing = filingFor(taking, flag)
  return filing === undefined || one[filing.file] === undefined
}

export function readTaking(argv: readonly string[], taking: Taking): Read {
  const refusals: string[] = []
  const words: string[] = []
  const one: Record<string, string> = {}
  const many: Record<string, string[]> = {}
  const repeats = new Set(taking.repeats ?? [])
  const valued = new Set([...taking.valued, ...(taking.repeats ?? [])])
  for (let at = 0; at < argv.length; at += 1) {
    const token = argv[at]
    if (token === undefined) continue
    if (!token.startsWith("-") || token === INPUT) {
      words.push(token)
      continue
    }
    if (!valued.has(token)) {
      refusals.push(`\`${token}\` is no flag this takes — it takes ${spelled([...valued])}`)
      continue
    }
    const value = argv[at + 1]
    if (value === undefined || valued.has(value)) {
      refusals.push(`\`${token}\` takes a value, and none follows it`)
      continue
    }
    at += 1
    if (repeats.has(token)) {
      const held = many[token] ?? []
      held.push(value)
      many[token] = held
      continue
    }
    if (one[token] !== undefined) {
      refusals.push(`\`${token}\` is said more than once, and it carries one value`)
      continue
    }
    one[token] = value
  }
  const named = taking.named
  const first = words[0]
  if (first !== undefined) {
    if (named === undefined) {
      refusals.push(`\`${first}\` follows this command, which takes no word standing on its own`)
    } else if (one[named] !== undefined) {
      refusals.push(`what \`${named}\` names is said both as \`${first}\` and at \`${named}\``)
    } else {
      one[named] = first
    }
  }
  const second = words[1]
  if (second !== undefined) {
    refusals.push(`\`${second}\` follows \`${first ?? ""}\`, and one call names one of these`)
  }
  for (const filing of taking.filing ?? []) {
    if (one[filing.said] !== undefined && one[filing.file] !== undefined) {
      refusals.push(`what \`${filing.said}\` names is said both there and at \`${filing.file}\``)
    }
  }
  for (const flag of taking.needed ?? []) {
    if (!unsaid(taking, one, many, flag)) continue
    const filing = filingFor(taking, flag)
    const how = filing === undefined ? "" : ` or at \`${filing.file}\``
    refusals.push(`this names \`${flag}\`${how}, and nothing said it`)
  }
  const either = taking.either
  if (
    either !== undefined &&
    either.every((flag) => one[flag] === undefined && (many[flag] ?? []).length === 0)
  ) {
    refusals.push(`this names ${spelled(either)} or both, and nothing said either`)
  }
  for (const flag of taking.numbered ?? []) {
    const value = one[flag]
    if (value !== undefined && !WHOLE_NUMBER.test(value)) {
      refusals.push(`\`${flag} ${value}\` is no whole number of nought or more`)
    }
  }
  const piped = (taking.filing ?? [])
    .filter((filing) => one[filing.file] === INPUT)
    .map((filing) => filing.file)
  if (piped.length > 1) {
    refusals.push(`${spelled(piped)} each name the input, and one call reads the input once`)
  }
  if (refusals.length > 0) return { refused: refusals }
  return { one, many }
}

export function pathAt(root: string, path: string): string {
  return isAbsolute(path) ? path : resolve(root, path)
}

export function maxIn(said: Said): number | undefined {
  const value = said.one[MAX]
  return value === undefined ? undefined : Number(value)
}

export function answering(value: unknown): Answer {
  return { report: JSON.stringify(value, null, 2).split("\n"), refusals: [], code: 0 }
}

export function refusing(said: readonly string[], code: number): Answer {
  return { report: [], refusals: said, code }
}

export async function answeredBy(run: () => Promise<Answer>): Promise<Answer> {
  try {
    return await run()
  } catch (thrown) {
    return refusing([whyOf(thrown)], 3)
  }
}

type Held = { readonly text: string } | { readonly why: string }

function heldAt(root: string, path: string, whole: boolean, piping: Piping): Held {
  if (path === INPUT) {
    const input = piping()
    if ("tty" in input) return { why: "`-` names the input, and nothing is piped in" }
    if ("unreadable" in input) return { why: `the input would not open — ${input.unreadable}` }
    const said = new TextDecoder().decode(input.bytes)
    return { text: whole ? said : said.replace(TRAILING_LINES, "") }
  }
  try {
    const said = readFileSync(pathAt(root, path), "utf8")
    return { text: whole ? said : said.replace(TRAILING_LINES, "") }
  } catch (thrown) {
    return { why: `${path} would not open — ${whyOf(thrown)}` }
  }
}

export type Prose = { readonly said: string | undefined } | { readonly why: string }

export function proseIn(given: Given, said: Said, filing: Filing, piping: Piping = inputIn): Prose {
  const inline = said.one[filing.said]
  if (inline !== undefined) return { said: inline }
  const path = said.one[filing.file]
  if (path === undefined) return { said: undefined }
  const held = heldAt(resolve(given.root), path, filing.whole, piping)
  if ("why" in held) return { why: `\`${filing.file} ${path}\` — ${held.why}` }
  return { said: held.text }
}

export type Composed = { readonly input: ComposeInput } | { readonly why: string }

export async function composedIn(
  given: Given,
  said: Said,
  piping: Piping = inputIn
): Promise<Composed> {
  const subject = proseIn(given, said, SUBJECT_FILING, piping)
  if ("why" in subject) return { why: subject.why }
  const body = proseIn(given, said, BODY_FILING, piping)
  if ("why" in body) return { why: body.why }
  if (subject.said === undefined || body.said === undefined) {
    return { why: `a composition names both \`${SUBJECT}\` and \`${BODY}\`` }
  }
  const root = resolve(given.root)
  const input = await buildComposeInput({
    to: said.many[TO] ?? [],
    cc: said.many[CC] ?? [],
    bcc: said.many[BCC] ?? [],
    subject: subject.said,
    body: body.said,
    thread: said.one[THREAD],
    replyToMessage: said.one[REPLY_TO],
    from: said.one[FROM],
    attach: (said.many[ATTACH] ?? []).map((path) => pathAt(root, path)),
  })
  return { input }
}
