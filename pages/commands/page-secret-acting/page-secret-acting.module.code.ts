import { readFileSync } from "node:fs"
import { join } from "node:path"
import { landingAsked, wroteAndTook } from "@akasha/command-system/asking"
import type { Answer, Given } from "@akasha/command-system/calling"
import { whyOf } from "@akasha/command-system/fault-saying"
import { secretAt } from "@akasha/pages-system/page-file-name"
import { cipherFor, type Secrets } from "@akasha/pages-system/page-secret"
import { propertiesOf } from "@akasha/pages-system/page-type-properties"
import { textAt, valueAt } from "@akasha/pages-system/page-value"

export const FILE_PATH = "--file-path"

export const KEY = "--key"

export const MESSAGE = "--message"

const PAGE_TYPE_SLUG = "pageTypeSlug"

const INPUT_AT = "/dev/stdin"

export function listed(said: readonly string[]): string {
  return said.map((one) => `\`${one}\``).join(", ")
}

export function mistaken(said: readonly string[]): Answer {
  return { report: [], refusals: said, code: 1 }
}

export function wrongData(said: string): Answer {
  return { report: [], refusals: [said], code: 2 }
}

export type Said = {
  readonly path: string
  readonly key: string | null
  readonly message: string | null
}

export type Read = Said | { readonly refused: readonly string[] }

export function readIn(argv: readonly string[], taken: readonly string[]): Read {
  const refusals: string[] = []
  const held = new Map<string, string>()
  for (let at = 0; at < argv.length; at += 1) {
    const one = argv[at]
    if (one === undefined) continue
    if (taken.includes(one)) {
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
      refusals.push(`\`${one}\` is no flag this takes — it takes ${listed(taken)}`)
      continue
    }
    refusals.push(`\`${one}\` is said as no flag, and everything this takes is named by one`)
  }
  for (const one of taken) {
    if (one === MESSAGE || held.has(one)) continue
    refusals.push(`${one} is what this takes, and this call names none`)
  }
  if (refusals.length > 0) return { refused: refusals }
  return {
    path: held.get(FILE_PATH) as string,
    key: held.get(KEY) ?? null,
    message: held.get(MESSAGE) ?? null,
  }
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
    return { refused: `${path} declares no page here, and a secret belongs to a page that stands` }
  }
  const pageTypeSlug = textAt(value, PAGE_TYPE_SLUG)
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

export type Taken =
  | { readonly bytes: Uint8Array }
  | { readonly tty: true }
  | { readonly unreadable: string }

export function pipedIn(): Taken {
  if (process.stdin.isTTY === true) return { tty: true }
  try {
    return { bytes: readFileSync(INPUT_AT) }
  } catch (thrown) {
    return { unreadable: whyOf(thrown) }
  }
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
    return { refused: "what was piped in is empty, and an empty secret stands for a usable one" }
  }
  if (value.includes("\n")) {
    return { refused: "what was piped in holds a newline, and a secret's value is one line" }
  }
  return value
}

export function messageFor(said: Said, target: Target, act: string): string {
  const spelled = said.message
  if (spelled !== null && spelled.trim() !== "") return spelled.trim()
  const named = said.key === null ? target.sidecar : `\`${said.key}\` in ${target.sidecar}`
  return `page secret ${act} ${named}`
}

export async function landedWith(
  given: Given,
  said: Said,
  target: Target,
  act: string,
  values: Secrets
): Promise<Answer> {
  const message = messageFor(said, target, act)
  if (values.size === 0) {
    return await landingAsked(given, {
      changes: [{ path: target.sidecar, body: null }],
      message,
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
  return await landingAsked(given, {
    changes: [{ path: target.sidecar, body: new TextEncoder().encode(composed.text) }],
    message,
    dryRun: false,
    glass: null,
    unmoved: [],
    saying: wroteAndTook,
  })
}

export async function caught(run: () => Answer | Promise<Answer>): Promise<Answer> {
  try {
    return await run()
  } catch (thrown) {
    return { report: [], refusals: [whyOf(thrown), "nothing was written"], code: 3 }
  }
}

export function aiming(
  argv: readonly string[],
  given: Given,
  taken: readonly string[]
): { readonly said: Said; readonly target: Target; readonly key: string | null } | Answer {
  const read = readIn(argv, taken)
  if ("refused" in read) return mistaken(read.refused)
  const target = targetIn(given.root, read.path)
  if ("refused" in target) return wrongData(target.refused)
  const key = read.key
  if (key !== null) {
    const wrong = undeclared(key, target)
    if (wrong !== null) return mistaken([wrong])
  }
  return { said: read, target, key }
}
