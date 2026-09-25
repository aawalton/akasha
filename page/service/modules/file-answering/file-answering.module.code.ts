import { FILE_PROPERTY } from "akasha/page/index/modules/entries/index-entries.module.code.ts"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  bytesAt,
  uncommittedBytesAt,
} from "akasha/page/modules/file-body/page-file-body.module.code.ts"
import { uncommittedIn } from "akasha/page/modules/uncommitted/page-uncommitted.module.code.ts"
import { valueAt } from "akasha/page/modules/value/page-value.module.code.ts"
import {
  textAt,
  textsAt,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { carriedFor } from "akasha/page/service/modules/kinds-gathering/kinds-gathering.module.code.ts"
import type { Faulted } from "akasha/page/service/modules/refusal-fault/refusal-fault.module.code.ts"
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
  return held === null ? null : (held[0] ?? null)
}

function endingKept(root: string, page: string, key: string): string | null {
  const beside = uncommittedIn(root, page)
  return beside === null ? null : textAt(beside, key)
}

function listing(root: string, asked: Named): readonly { readonly path: string }[] | string {
  try {
    return listedAt(root, asked.pageTypeSlug, asked.slug)
  } catch (thrown) {
    return String(thrown)
  }
}

export function filing(root: string, asked: Named): Faulted<Filed> {
  const carried = carriedFor(root, asked.pageTypeSlug).find((one) => one.key === asked.key)
  if (carried === undefined) {
    return { refused: `\`${asked.pageTypeSlug}\` has no \`${asked.key}\``, fault: "caller" }
  }
  if (carried.pageTypeSlug !== FILE_PROPERTY) {
    const refused = `\`${asked.key}\` names no file property, so no file beside a page holds it`
    return { refused, fault: "caller" }
  }
  if (carried.secret) return { refused: `\`${asked.key}\` is held secret`, fault: "caller" }
  const listed = listing(root, asked)
  if (typeof listed === "string") return { refused: listed, fault: "service" }
  if (listed.length > 1) {
    return { refused: `\`${namedIn(asked)}\` sits at ${listed.length} paths`, fault: "service" }
  }
  const first = listed[0]
  if (first === undefined) {
    return { refused: `\`${namedIn(asked)}\` is no page here`, fault: "caller" }
  }
  const value = valueAt(first.path, root)
  if (value === null) return { refused: `\`${namedIn(asked)}\` would not load`, fault: "service" }
  const stated = textAt(value, asked.key)
  const held =
    stated ??
    (carried.uncommitted
      ? (endingKept(root, first.path, asked.key) ?? endingFor(root, carried))
      : null)
  if (held === null) {
    return { refused: `\`${namedIn(asked)}\` states no \`${asked.key}\``, fault: "caller" }
  }
  const read = carried.uncommitted
    ? uncommittedBytesAt(root, first.path, carried.propertySlug, held)
    : bytesAt(root, first.path, carried.propertySlug, held)
  if ("refused" in read) return { refused: read.refused, fault: "caller" }
  return { bytes: read.bytes, path: first.path }
}
