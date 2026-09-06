import { listedAt } from "@akasha/indexes"
import { FILE_PROPERTY } from "@akasha/indexes/entries"
import { bytesAt } from "@akasha/pages/page-file-body"
import { valueAt } from "@akasha/pages/page-value"
import { textAt } from "@akasha/pages/page-value-reading"
import { carriedFor } from "../kinds-gathering/kinds-gathering.module.code.ts"

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

function listing(root: string, asked: Named): readonly { readonly path: string }[] | string {
  try {
    return listedAt(root, asked.pageTypeSlug, asked.slug)
  } catch (thrown) {
    return String(thrown)
  }
}

// A CALLER NAMES A PAGE AND A KEY RATHER THAN A PATH. The service asks nobody for a credential and
// every pod in the cluster reaches it, so a road taking a path would hand the whole tree to all of
// them; a page type, a slug and a declared key reach only what a page type already says is a file.
export function filing(root: string, asked: Named): Filed {
  const carried = carriedFor(root, asked.pageTypeSlug).find((one) => one.key === asked.key)
  if (carried === undefined) {
    return { refused: `\`${asked.pageTypeSlug}\` carries no \`${asked.key}\`` }
  }
  if (carried.pageTypeSlug !== FILE_PROPERTY) {
    return { refused: `\`${asked.key}\` names no file property, so no file beside a page holds it` }
  }
  if (carried.secret) return { refused: `\`${asked.key}\` is held secret` }
  if (carried.uncommitted) return { refused: `\`${asked.key}\` is held outside the commit` }
  const listed = listing(root, asked)
  if (typeof listed === "string") return { refused: listed }
  if (listed.length > 1) {
    return { refused: `\`${namedIn(asked)}\` sits at ${listed.length} paths` }
  }
  const first = listed[0]
  if (first === undefined) return { refused: `\`${namedIn(asked)}\` is no page here` }
  const value = valueAt(first.path, root)
  if (value === null) return { refused: `\`${namedIn(asked)}\` would not load` }
  const held = textAt(value, asked.key)
  if (held === null) return { refused: `\`${namedIn(asked)}\` states no \`${asked.key}\`` }
  const read = bytesAt(root, first.path, carried.propertySlug, held)
  if ("refused" in read) return read
  return { bytes: read.bytes, path: first.path }
}
