import { readFileSync, statSync } from "node:fs"
import { join } from "node:path"
import { FILE_PROPERTY } from "@akasha/indexes/entries"
import { besideAt } from "../file-name/page-file-name.module.code.ts"
import { partsOf } from "../file-parts/page-file-parts.module.code.ts"
import type { Value } from "../value/page-value.module.code.ts"

const UNKNOWN = "so what the page holds there is unknown rather than nothing"

export type Filed = {
  readonly key: string
  readonly propertySlug: string
  readonly pageTypeSlug: string
}

export type Body = { readonly body: string } | { readonly refused: string }

export type Bytes = { readonly bytes: Uint8Array<ArrayBuffer> } | { readonly refused: string }

export function filedAmong<T extends Filed>(declared: Iterable<T>): readonly T[] {
  const found: T[] = []
  for (const one of declared) {
    if (one.pageTypeSlug === FILE_PROPERTY) found.push(one)
  }
  return found
}

function filed(root: string, at: string): boolean {
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

export function bytesAt(root: string, page: string, propertySlug: string, held: string): Bytes {
  const first = besideAt(page, propertySlug, held)
  if (first === null) return { refused: `'${page}' is no page file, ${UNKNOWN}` }
  if (!filed(root, first)) {
    return {
      refused: `'${first}' is named by the page it sits beside and no file is there, ${UNKNOWN}`,
    }
  }
  const found: Uint8Array[] = []
  for (const at of partsOf(page, propertySlug, held, (one) => filed(root, one))) {
    found.push(readFileSync(join(root, at)))
  }
  return { bytes: joined(found) }
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
