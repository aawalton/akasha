import { join } from "node:path"
import { secretAt } from "@akasha/pages-system/page-file-name"
import { cipherFor, keysBeside, type Secrets, secretsIn } from "@akasha/pages-system/page-secret"
import { propertiesOf } from "@akasha/pages-system/page-type-properties"
import { textAt, valueAt } from "@akasha/pages-system/page-value"
import { landingAsked, wroteAndTook } from "../../asking/asking.module.code.ts"
import type { Answer, Given } from "../../calling/calling.module.code.ts"
import { whyOf } from "../../fault-saying/fault-saying.module.code.ts"
import { inputIn, type Piping } from "../../piping/piping.module.code.ts"

export const SECRET = "secret"

export const SHOW = "show"

export const REVEAL = "reveal"

export const SET = "set"

export const CLEAR = "clear"

export const FILE_PATH = "--file-path"

export const KEY = "--key"

export const MESSAGE = "--message"

const SUBJECTS = [SECRET]

const ACTS = [SHOW, REVEAL, SET, CLEAR]

const KEYED = [REVEAL, SET, CLEAR]

const VALUED = [FILE_PATH, KEY, MESSAGE]

export type Said = {
  readonly subject: string
  readonly act: string
  readonly path: string
  readonly key: string | null
  readonly message: string | null
}

export type Read = Said | { readonly refused: readonly string[] }

function listed(said: readonly string[]): string {
  return said.map((one) => `\`${one}\``).join(", ")
}

export function readIn(argv: readonly string[]): Read {
  const refusals: string[] = []
  const words: string[] = []
  const held = new Map<string, string>()
  for (let at = 0; at < argv.length; at += 1) {
    const one = argv[at]
    if (one === undefined) continue
    if (VALUED.includes(one)) {
      const value = argv[at + 1]
      at += 1
      if (value === undefined || value.startsWith("-")) {
        refusals.push(`${one} names no value, and it takes one`)
        continue
      }
      if (held.has(one)) refusals.push(`${one} is said twice, and one call names one of it`)
      held.set(one, value)
      continue
    }
    if (one.startsWith("-")) {
      refusals.push(`\`${one}\` is no flag this takes — it takes ${listed(VALUED)}`)
      continue
    }
    words.push(one)
  }
  const subject = words[0]
  if (subject === undefined) {
    return {
      refused: [...refusals, `this names nothing to act on — it acts on ${listed(SUBJECTS)}`],
    }
  }
  if (!SUBJECTS.includes(subject)) {
    refusals.push(`\`${subject}\` is nothing this acts on — it acts on ${listed(SUBJECTS)}`)
  }
  const act = words[1]
  if (act === undefined) {
    return { refused: [...refusals, `\`${subject}\` names no act — it carries ${listed(ACTS)}`] }
  }
  if (!ACTS.includes(act)) {
    refusals.push(`\`${act}\` is no act \`${subject}\` carries — it carries ${listed(ACTS)}`)
  }
  for (const spare of words.slice(2)) {
    refusals.push(`\`${spare}\` follows the act \`${act}\`, and one call names one act`)
  }
  const path = held.get(FILE_PATH)
  if (path === undefined) {
    refusals.push(`${FILE_PATH} names the page acted on, and this call names none`)
  }
  const key = held.get(KEY) ?? null
  if (KEYED.includes(act) && key === null) {
    refusals.push(`${KEY} names the one secret \`${act}\` acts on, and this call names none`)
  }
  if (act === SHOW && key !== null) {
    refusals.push(`\`${SHOW}\` names every secret a page holds, so it takes no ${KEY}`)
  }
  if (refusals.length > 0 || path === undefined) return { refused: refusals }
  return { subject, act, path, key, message: held.get(MESSAGE) ?? null }
}

export type Target = {
  readonly path: string
  readonly sidecar: string
  readonly declared: readonly string[]
}

export function declaredIn(root: string, pageTypeSlug: string): readonly string[] {
  return propertiesOf(pageTypeSlug, root, (at) => valueAt(at, root))
    .filter((one) => one.secret)
    .map((one) => one.key)
    .sort()
}

export function targetIn(root: string, path: string): Target | { readonly refused: string } {
  const sidecar = secretAt(path)
  if (sidecar === null) {
    return { refused: `${path} is no TypeScript page, and a sops file stands beside a page` }
  }
  const value = valueAt(join(root, path), root)
  if (value === null) {
    return { refused: `${path} states no page here, and a secret belongs to a page that stands` }
  }
  const pageTypeSlug = textAt(value, "pageTypeSlug")
  if (pageTypeSlug === null) {
    return { refused: `${path} names no page type, so nothing says which of its values are secret` }
  }
  return { path, sidecar, declared: declaredIn(root, pageTypeSlug) }
}

export function undeclared(key: string, target: Target): string | null {
  if (target.declared.includes(key)) return null
  const named =
    target.declared.length === 0 ? "declares none" : `declares ${listed(target.declared)}`
  return `\`${key}\` is no secret of ${target.path}'s page type, which ${named}`
}

function showing(root: string, target: Target): Answer {
  const keys = keysBeside(root, target.path)
  return {
    report: [
      keys.length === 0
        ? `${target.sidecar} holds nothing`
        : `${target.sidecar} holds ${listed([...keys])}`,
      target.declared.length === 0
        ? `the page type declares no secret`
        : `the page type declares ${listed(target.declared)}`,
    ],
    refusals: [],
    code: 0,
  }
}

function revealing(root: string, target: Target, key: string): Answer {
  const held = secretsIn(root, target.path)
  const value = held === null ? undefined : held.get(key)
  if (value === undefined) {
    return { report: [], refusals: [`${target.sidecar} holds no \`${key}\``], code: 2 }
  }
  return { report: [value], refusals: [], code: 0 }
}

export function valueOf(bytes: Uint8Array): string | { readonly refused: string } {
  let text: string
  try {
    text = new TextDecoder("utf-8", { fatal: true }).decode(bytes)
  } catch {
    return { refused: "what was piped in is no utf-8 text, and a secret's value is text" }
  }
  const value = text.endsWith("\n") ? text.slice(0, -1) : text
  if (value === "") {
    return {
      refused: "what was piped in is empty, and an empty secret would stand for a usable one",
    }
  }
  if (value.includes("\n")) {
    return { refused: "what was piped in holds a newline, and a secret's value is one line" }
  }
  return value
}

function messageFor(said: Said, target: Target): string {
  const spelled = said.message
  if (spelled !== null && spelled.trim() !== "") return spelled.trim()
  const named = said.key === null ? target.sidecar : `\`${said.key}\` in ${target.sidecar}`
  return `page secret ${said.act} ${named}`
}

function landingWith(given: Given, said: Said, target: Target, values: Secrets | null): Answer {
  if (values === null || values.size === 0) {
    return landingAsked(given, {
      changes: [{ path: target.sidecar, body: null }],
      message: messageFor(said, target),
      dryRun: false,
      glass: null,
      unmoved: [],
      saying: wroteAndTook,
    })
  }
  const composed = cipherFor(given.root, target.path, values)
  if (composed.text === null) {
    return { report: [], refusals: [composed.why, "nothing was written"], code: 2 }
  }
  return landingAsked(given, {
    changes: [{ path: target.sidecar, body: new TextEncoder().encode(composed.text) }],
    message: messageFor(said, target),
    dryRun: false,
    glass: null,
    unmoved: [],
    saying: wroteAndTook,
  })
}

function setting(given: Given, said: Said, target: Target, key: string, piping: Piping): Answer {
  const input = piping()
  if ("tty" in input) {
    return {
      report: [],
      refusals: [`a secret's value is piped in, and nothing is piped in`],
      code: 1,
    }
  }
  if ("unreadable" in input) {
    return {
      report: [],
      refusals: [`what is piped in would not open — ${input.unreadable}`],
      code: 3,
    }
  }
  const value = valueOf(input.bytes)
  if (typeof value !== "string") return { report: [], refusals: [value.refused], code: 1 }
  const held = secretsIn(given.root, target.path)
  const next = new Map(held ?? [])
  next.set(key, value)
  return landingWith(given, said, target, next)
}

function clearing(given: Given, said: Said, target: Target, key: string): Answer {
  const held = secretsIn(given.root, target.path)
  if (held === null || !held.has(key)) {
    return {
      report: [],
      refusals: [`${target.sidecar} holds no \`${key}\`, so there is none to clear`],
      code: 2,
    }
  }
  const next = new Map(held)
  next.delete(key)
  return landingWith(given, said, target, next)
}

function acting(given: Given, said: Said, piping: Piping): Answer {
  const target = targetIn(given.root, said.path)
  if ("refused" in target) return { report: [], refusals: [target.refused], code: 2 }
  const key = said.key
  if (key !== null) {
    const wrong = undeclared(key, target)
    if (wrong !== null) return { report: [], refusals: [wrong], code: 1 }
  }
  if (said.act === SHOW) return showing(given.root, target)
  if (key === null) return { report: [], refusals: [`${KEY} names no secret`], code: 1 }
  if (said.act === REVEAL) return revealing(given.root, target, key)
  if (said.act === SET) return setting(given, said, target, key, piping)
  return clearing(given, said, target, key)
}

export function paging(argv: readonly string[], given: Given, piping: Piping): Answer {
  const read = readIn(argv)
  if ("refused" in read) return { report: [], refusals: read.refused, code: 1 }
  try {
    return acting(given, read, piping)
  } catch (thrown) {
    return { report: [], refusals: [whyOf(thrown), "nothing was written"], code: 3 }
  }
}

export function page(argv: readonly string[], given: Given): Answer {
  return paging(argv, given, inputIn)
}
