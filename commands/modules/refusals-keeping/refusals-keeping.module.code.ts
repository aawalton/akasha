import { rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { ANSWER_CEILING } from "akasha/commands/pages/read/long-body/long-body.module.code.ts"
import { uncommittedBesideAt } from "akasha/pages/file-name/page-file-name.module.code.ts"

const SLUG = "refusals"

const HELD = "txt"

const PARTED = "\n\n"

const BYTES = new TextEncoder()

const PAST = `what refused this landing runs past the ${ANSWER_CEILING} bytes one answer holds`

export function refusalsAt(page: string): string | null {
  return uncommittedBesideAt(page, SLUG, HELD)
}

export function bodyOf(refusals: readonly string[]): string {
  return `${refusals.join(PARTED)}\n`
}

export function fits(refusals: readonly string[]): boolean {
  return BYTES.encode(bodyOf(refusals)).byteLength <= ANSWER_CEILING
}

export function pointerFor(at: string): string {
  return `every refusal is written whole at ${at}, and \`akasha read --file-path ${at}\` opens it`
}

export function pointedAt(at: string): readonly string[] {
  return [PAST, pointerFor(at)]
}

function put(at: string, body: string | null): boolean {
  try {
    if (body === null) rmSync(at, { force: true })
    else writeFileSync(at, body)
    return true
  } catch {
    return false
  }
}

export function refusalsPut(
  root: string,
  page: string,
  refusals: readonly string[]
): string | null {
  const at = refusalsAt(page)
  if (at === null) return null
  const held = refusals.length === 0 ? null : bodyOf(refusals)
  if (!put(join(root, at), held)) return null
  return held === null ? null : at
}

export function refusalsKept(
  root: string,
  page: string,
  refusals: readonly string[]
): readonly string[] {
  const at = refusalsPut(root, page, refusals)
  return at === null || fits(refusals) ? refusals : pointedAt(at)
}
