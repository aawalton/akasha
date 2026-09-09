import { readFileSync } from "node:fs"
import { join } from "node:path"
import { secretAt } from "@akasha/pages/page-file-name"
import { cipherFor, type Secrets } from "@akasha/pages/page-secret"
import { propertiesOf } from "@akasha/pages/page-type-properties"
import { textAt, valueAt } from "@akasha/pages/page-value"
import type { Asking } from "akasha/changes/runners/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { runMechanicalChange } from "akasha/changes/runners/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { mistaking } from "../../../commands/modules/asking/asking.module.code.ts"
import type { Answer, Given } from "../../../commands/modules/calling/calling.module.code.ts"
import { whyOf } from "../../../commands/modules/fault-saying/fault-saying.module.code.ts"
import { quoted as listed } from "../../../commands/modules/seat-act-calling/seat-act-calling.module.code.ts"

export const FILE_PATH = "--file-path"

export const KEY = "--key"

export const MESSAGE = "--message"

export const KEEP_LAST_NEWLINE = "--keep-last-newline"

const PAGE_TYPE = "type"

const PAGE_TYPE_SLUG = "pageTypeSlug"

const INPUT_AT = "/dev/stdin"

export const mistaken = mistaking

export function wrongData(said: string): Answer {
  return { report: [], refusals: [said], code: 2 }
}

export type Said = {
  readonly path: string
  readonly key: string | null
  readonly message: string | null
  readonly keepLastNewline: boolean
}

export type Read = Said | { readonly refused: readonly string[] }

export function readIn(
  argv: readonly string[],
  taken: readonly string[],
  flagged: readonly string[] = []
): Read {
  const refusals: string[] = []
  const held = new Map<string, string>()
  const said = new Set<string>()
  for (let at = 0; at < argv.length; at += 1) {
    const one = argv[at]
    if (one === undefined) continue
    if (flagged.includes(one)) {
      if (said.has(one)) refusals.push(`${one} is said twice, and one call names one of it`)
      said.add(one)
      continue
    }
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
      refusals.push(`\`${one}\` is no flag this takes — it takes ${listed([...taken, ...flagged])}`)
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
    keepLastNewline: said.has(KEEP_LAST_NEWLINE),
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
  const pageTypeSlug = textAt(value, PAGE_TYPE) ?? textAt(value, PAGE_TYPE_SLUG)
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

export function valueIn(
  bytes: Uint8Array,
  keepLastNewline = false
): string | { readonly refused: string } {
  let text: string
  try {
    text = new TextDecoder("utf-8", { fatal: true }).decode(bytes)
  } catch {
    return { refused: "what was piped in is no utf-8 text, and a secret's value is text" }
  }
  const value = !keepLastNewline && text.endsWith("\n") ? text.slice(0, -1) : text
  if (value === "") {
    return { refused: "what was piped in is empty, and an empty secret stands for a usable one" }
  }
  return value
}

export function messageFor(said: Said, target: Target, act: string): string {
  const spelled = said.message
  if (spelled !== null && spelled.trim() !== "") return spelled.trim()
  const named = said.key === null ? target.sidecar : `\`${said.key}\` in ${target.sidecar}`
  return `page secret ${act} ${named}`
}

export const PUT = "change-mechanical/add-file-of-any-kind"

export const TAKE = "change-mechanical-file/remove-file"

export type Landing = (
  root: string,
  changes: readonly Asking[],
  message: string
) => ReturnType<typeof runMechanicalChange>

function answered(landed: Awaited<ReturnType<Landing>>, did: string): Answer {
  const wrong = "refusals" in landed ? landed.refusals : landed.wrong
  if (wrong.length > 0) return { report: [], refusals: wrong, code: 3 }
  return { report: [did], refusals: [], code: 0 }
}

export async function landedWith(
  given: Given,
  said: Said,
  target: Target,
  act: string,
  values: Secrets,
  landing: Landing = runMechanicalChange
): Promise<Answer> {
  const message = messageFor(said, target, act)
  if (values.size === 0) {
    const taken: readonly Asking[] = [{ at: TAKE, given: { at: target.sidecar } }]
    return answered(await landing(given.root, taken, message), `took away ${target.sidecar}`)
  }
  const composed = cipherFor(given.root, target.path, values)
  if (composed.text === null) {
    return { report: [], refusals: [composed.why, "nothing was written"], code: 2 }
  }
  const written: readonly Asking[] = [
    { at: PUT, given: { at: target.sidecar, body: composed.text } },
  ]
  return answered(await landing(given.root, written, message), `wrote ${target.sidecar}`)
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
  taken: readonly string[],
  flagged: readonly string[] = []
): { readonly said: Said; readonly target: Target; readonly key: string | null } | Answer {
  const read = readIn(argv, taken, flagged)
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
