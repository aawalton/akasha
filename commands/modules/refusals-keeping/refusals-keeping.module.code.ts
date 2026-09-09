import { rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { uncommittedBesideAt } from "@akasha/pages/page-file-name"
import { ANSWER_CEILING } from "../../pages/read/long-body/long-body.module.code.ts"

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

export function pointedAt(at: string): readonly string[] {
  return [
    PAST,
    `every refusal is written whole at ${at}`,
    `\`akasha read --file-path ${at}\` opens that file`,
  ]
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

export function refusalsKept(
  root: string,
  page: string,
  refusals: readonly string[]
): readonly string[] {
  const at = refusalsAt(page)
  if (at === null) return refusals
  const held = refusals.length === 0 ? null : bodyOf(refusals)
  if (!put(join(root, at), held)) return refusals
  return held === null || fits(refusals) ? refusals : pointedAt(at)
}
