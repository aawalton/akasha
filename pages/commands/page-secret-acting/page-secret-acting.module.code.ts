import { readFileSync } from "node:fs"
import { join } from "node:path"
import type {
  Asking,
  Writing,
} from "akasha/changes/runners/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { runMechanicalChange } from "akasha/changes/runners/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import {
  DATA,
  OPERATIONAL,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import type { Committing } from "akasha/commands/modules/landing/landing.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { secretAt } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { cipherFor, type Secrets } from "akasha/pages/secret/page-secret.module.code.ts"
import { propertiesOf } from "akasha/pages/types/declared-properties/declared-properties.module.code.ts"
import { valueAt } from "akasha/pages/value/page-value.module.code.ts"
import { textAt } from "akasha/pages/value-reading/page-value-reading.module.code.ts"
import { namesDrawn } from "akasha/utils/text/name-drawing/name-drawing.module.code.ts"

const PAGE_TYPE = "type"

const PAGE_TYPE_SLUG = "pageTypeSlug"

const INPUT_AT = "/dev/stdin"

export const mistaken = mistaking

export function wrongData(said: string): Answer {
  return refusedBy([said], DATA)
}

export type Saying = {
  readonly commitMessage?: string
  readonly key?: string
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
    target.declared.length === 0 ? "declares none" : `declares ${namesDrawn(target.declared)}`
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

export function messageFor(saying: Saying, target: Target, act: string): string {
  const spelled = saying.commitMessage
  if (spelled !== undefined && spelled.trim() !== "") return spelled.trim()
  const key = saying.key
  const named = key === undefined ? target.sidecar : `\`${key}\` in ${target.sidecar}`
  return `page secret ${act} ${named}`
}

export const PUT = "change-mechanical/add-file-of-any-kind"

export const TAKE = "change-mechanical-file/remove-file"

export type Landing = (
  root: string,
  changes: readonly Asking[],
  message: string,
  agentId?: string | null,
  writing?: Writing
) => ReturnType<typeof runMechanicalChange>

const NOTHING_WRITTEN = "nothing was written"

const BEFORE_STOPPING =
  "was committed before this stopped, so read that commit rather than running this again"

function answered(landed: Awaited<ReturnType<Landing>>, did: string): Answer {
  const wrong = "refusals" in landed ? landed.refusals : landed.wrong
  if (wrong.length > 0) return refusedBy(wrong, OPERATIONAL)
  return told([did])
}

function stoppedSaid(commit: string | null): string {
  return commit === null ? NOTHING_WRITTEN : `${commit} ${BEFORE_STOPPING}`
}

async function landedOnto(
  landing: Landing,
  root: string,
  changes: readonly Asking[],
  message: string,
  did: string
): Promise<Answer> {
  const noting: Committing = { commit: null }
  try {
    return answered(await landing(root, changes, message, null, { noting }), did)
  } catch (thrown) {
    return refusedBy([whyOf(thrown), stoppedSaid(noting.commit)], OPERATIONAL)
  }
}

export async function landedWith(
  given: Given,
  saying: Saying,
  target: Target,
  act: string,
  values: Secrets,
  landing: Landing = runMechanicalChange
): Promise<Answer> {
  const message = messageFor(saying, target, act)
  if (values.size === 0) {
    const taken: readonly Asking[] = [{ at: TAKE, given: { at: target.sidecar } }]
    return await landedOnto(landing, given.root, taken, message, `took away ${target.sidecar}`)
  }
  const composed = cipherFor(given.root, target.path, values)
  if (composed.text === null) return refusedBy([composed.why, NOTHING_WRITTEN], DATA)
  const written: readonly Asking[] = [
    { at: PUT, given: { at: target.sidecar, body: composed.text } },
  ]
  return await landedOnto(landing, given.root, written, message, `wrote ${target.sidecar}`)
}

export async function caught(run: () => Answer | Promise<Answer>): Promise<Answer> {
  try {
    return await run()
  } catch (thrown) {
    return refusedBy([whyOf(thrown), NOTHING_WRITTEN], OPERATIONAL)
  }
}

export function targeting(
  given: Given,
  path: string,
  key: string | undefined
): { readonly target: Target } | Answer {
  const target = targetIn(given.root, path)
  if ("refused" in target) return wrongData(target.refused)
  if (key !== undefined) {
    const wrong = undeclared(key, target)
    if (wrong !== null) return mistaken([wrong])
  }
  return { target }
}
