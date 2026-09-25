import { Buffer } from "node:buffer"
import { statSync } from "node:fs"
import { join } from "node:path"
import { oversized } from "akasha/page/modules/entry-writing/page-entry-writing.module.code.ts"
import { FIRST_PART } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import {
  partAt,
  partsOf,
  uncommittedPartAt,
  uncommittedPartsOf,
} from "akasha/page/modules/file-parts/page-file-parts.module.code.ts"

const NO_NAME = "is no page file, so the files beside that page have no name"

export const NO_PAGE = "names no page file on disk, so nothing written beside that page is read"

export type Filling = {
  readonly path: string
  readonly part: number
  readonly filled: number
  readonly uncommitted: boolean
}

type Filled = { readonly filling: Filling } | { readonly refused: string }

export function bytesIn(text: string): number {
  return Buffer.byteLength(text, "utf8")
}

export function filed(at: string): boolean {
  return statSync(at, { throwIfNoEntry: false })?.isFile() === true
}

function sizeOf(at: string): number {
  const found = statSync(at, { throwIfNoEntry: false })
  return found === undefined || !found.isFile() ? 0 : found.size
}

export function openedAt(
  root: string,
  page: string,
  propertySlug: string,
  held: string,
  uncommitted = false
): Filled {
  if (!filed(join(root, page))) return { refused: `'${page}' ${NO_PAGE}` }
  const there = (one: string): boolean => filed(join(root, one))
  const found = uncommitted
    ? uncommittedPartsOf(page, propertySlug, held, there)
    : partsOf(page, propertySlug, held, there)
  const last = found.at(-1)
  if (last === undefined) return { refused: `'${page}' ${NO_NAME}` }
  return {
    filling: {
      path: last,
      part: FIRST_PART + found.length - 1,
      filled: sizeOf(join(root, last)),
      uncommitted,
    },
  }
}

export function rolledInto(
  page: string,
  propertySlug: string,
  held: string,
  filling: Filling,
  size: number,
  ceiling: number
): Filled {
  if (size > ceiling) return { refused: oversized(size, ceiling, filling.path) }
  if (filling.filled === 0 || filling.filled + size <= ceiling) {
    return { filling: { ...filling, filled: filling.filled + size } }
  }
  const part = filling.part + 1
  const next = filling.uncommitted
    ? uncommittedPartAt(page, propertySlug, held, part)
    : partAt(page, propertySlug, held, part)
  if (next === null) return { refused: `'${page}' ${NO_NAME}` }
  return { filling: { path: next, part, filled: size, uncommitted: filling.uncommitted } }
}
