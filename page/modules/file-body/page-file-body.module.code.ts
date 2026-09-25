import { readFileSync, statSync } from "node:fs"
import { join } from "node:path"
import { FILE_PROPERTY } from "akasha/page/index/modules/entries/index-entries.module.code.ts"
import {
  besideAt,
  uncommittedBesideAt,
} from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import {
  partsOf,
  uncommittedPartsOf,
} from "akasha/page/modules/file-parts/page-file-parts.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const UNKNOWN = "so what the page holds there is unknown rather than nothing"

type Filed = {
  readonly key: string
  readonly propertySlug: string
  readonly pageTypeSlug: string
}

type Body = { readonly body: string } | { readonly refused: string }

type Bytes = { readonly bytes: Uint8Array<ArrayBuffer> } | { readonly refused: string }

export function filedAmong<T extends Filed>(declared: Iterable<T>): readonly T[] {
  const found: T[] = []
  for (const one of declared) {
    if (one.pageTypeSlug === FILE_PROPERTY) found.push(one)
  }
  return found
}

export function filed(root: string, at: string): boolean {
  const found = statSync(join(root, at), { throwIfNoEntry: false })
  return found?.isFile() === true
}

function joined(found: readonly Uint8Array[]): Uint8Array<ArrayBuffer> {
  let total = 0
  for (const one of found) total += one.length
  const whole = new Uint8Array(total)
  let at = 0
  for (const one of found) {
    whole.set(one, at)
    at += one.length
  }
  return whole
}

function bytesOver(
  root: string,
  page: string,
  first: string | null,
  naming: (there: (at: string) => boolean) => readonly string[]
): Bytes {
  if (first === null) return { refused: `'${page}' is no page file, ${UNKNOWN}` }
  if (!filed(root, first)) {
    return {
      refused: `'${first}' is named by the page it sits beside and no file is there, ${UNKNOWN}`,
    }
  }
  const found: Uint8Array[] = []
  for (const at of naming((one) => filed(root, one))) found.push(readFileSync(join(root, at)))
  return { bytes: joined(found) }
}

export function bytesAt(root: string, page: string, propertySlug: string, held: string): Bytes {
  return bytesOver(root, page, besideAt(page, propertySlug, held), (there) =>
    partsOf(page, propertySlug, held, there)
  )
}

export function uncommittedBytesAt(
  root: string,
  page: string,
  propertySlug: string,
  held: string
): Bytes {
  return bytesOver(root, page, uncommittedBesideAt(page, propertySlug, held), (there) =>
    uncommittedPartsOf(page, propertySlug, held, there)
  )
}

export function bodyAt(root: string, page: string, propertySlug: string, held: string): Body {
  const read = bytesAt(root, page, propertySlug, held)
  if ("refused" in read) return read
  return { body: new TextDecoder().decode(read.bytes) }
}

export function filedValue(
  root: string,
  page: string,
  value: Value,
  declared: Iterable<Filed>,
  wanted: Iterable<string>
): Value {
  const asked = new Set(wanted)
  if (asked.size === 0) return value
  const held: Record<string, unknown> = {}
  let turned = false
  for (const one of filedAmong(declared)) {
    if (!asked.has(one.key)) continue
    const said = value[one.key]
    if (typeof said !== "string") continue
    const read = bodyAt(root, page, one.propertySlug, said)
    if ("refused" in read) throw new Error(read.refused)
    held[one.key] = read.body
    turned = true
  }
  return turned ? { ...value, ...held } : value
}
