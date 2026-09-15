import { FILE_PROPERTY } from "akasha/page/index/modules/entries/index-entries.module.code.ts"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  bytesAt,
  uncommittedBytesAt,
} from "akasha/page/modules/file-body/page-file-body.module.code.ts"
import { valueAt } from "akasha/page/modules/value/page-value.module.code.ts"
import {
  textAt,
  textsAt,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { carriedFor } from "akasha/page/service/modules/kinds-gathering/kinds-gathering.module.code.ts"
import type { Carried } from "akasha/page/type/modules/declared-properties/declared-properties.module.code.ts"

export type Named = {
  readonly pageTypeSlug: string
  readonly slug: string
  readonly key: string
}

export type Filed =
  | { readonly bytes: Uint8Array<ArrayBuffer>; readonly path: string }
  | { readonly refused: string }

function namedIn(asked: Named): string {
  return `${asked.pageTypeSlug}/${asked.slug}`
}

const EXTENSIONS = "extensions"

function endingFor(root: string, carried: Carried): string | null {
  const listed = listedAt(root, carried.pageTypeSlug, carried.pagePropertySlug)
  const first = listed.length === 1 ? listed[0] : undefined
  if (first === undefined) return null
  const value = valueAt(first.path, root)
  if (value === null) return null
  const held = textsAt(value, EXTENSIONS)
  return held !== null && held.length === 1 ? (held[0] ?? null) : null
}

function listing(root: string, asked: Named): readonly { readonly path: string }[] | string {
  try {
    return listedAt(root, asked.pageTypeSlug, asked.slug)
  } catch (thrown) {
    return String(thrown)
  }
}

export function filing(root: string, asked: Named): Filed {
  const carried = carriedFor(root, asked.pageTypeSlug).find((one) => one.key === asked.key)
  if (carried === undefined) {
    return { refused: `\`${asked.pageTypeSlug}\` has no \`${asked.key}\`` }
  }
  if (carried.pageTypeSlug !== FILE_PROPERTY) {
    return { refused: `\`${asked.key}\` names no file property, so no file beside a page holds it` }
  }
  if (carried.secret) return { refused: `\`${asked.key}\` is held secret` }
  const listed = listing(root, asked)
  if (typeof listed === "string") return { refused: listed }
  if (listed.length > 1) {
    return { refused: `\`${namedIn(asked)}\` sits at ${listed.length} paths` }
  }
  const first = listed[0]
  if (first === undefined) return { refused: `\`${namedIn(asked)}\` is no page here` }
  const value = valueAt(first.path, root)
  if (value === null) return { refused: `\`${namedIn(asked)}\` would not load` }
  const stated = textAt(value, asked.key)
  const held = stated ?? (carried.uncommitted ? endingFor(root, carried) : null)
  if (held === null) return { refused: `\`${namedIn(asked)}\` states no \`${asked.key}\`` }
  const read = carried.uncommitted
    ? uncommittedBytesAt(root, first.path, carried.propertySlug, held)
    : bytesAt(root, first.path, carried.propertySlug, held)
  if ("refused" in read) return read
  return { bytes: read.bytes, path: first.path }
}
