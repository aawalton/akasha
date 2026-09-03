import { landingAsked, wroteAndTook } from "@akasha/command-system/asking"
import type { Answer, Given } from "@akasha/command-system/calling"
import type { FileEdit } from "@akasha/command-system/landing"
import { listedAt } from "@akasha/indexes"
import { type Value, valueAt } from "@akasha/pages-system/page-value"
import { composedFor } from "@akasha/pages-system-service/composing"

export type Standing = { readonly values: Value | null } | { readonly refused: string }

export type Writing = {
  readonly pageTypeSlug: string
  readonly slug: string
  readonly values: Value
}

export type Edits =
  | { readonly changes: readonly FileEdit[]; readonly paths: readonly string[] }
  | { readonly refused: string }

export function standingAt(root: string, pageTypeSlug: string, slug: string): Standing {
  const listed = listedAt(root, pageTypeSlug, slug)
  const at = listed.length === 1 ? listed[0]?.path : undefined
  if (at === undefined) return { values: null }
  const was = valueAt(at, root)
  if (was === null) return { refused: `${at} would not load, so what it holds is unknown` }
  return { values: was }
}

export function editsFor(root: string, writings: readonly Writing[]): Edits {
  const changes: FileEdit[] = []
  const paths: string[] = []
  for (const one of writings) {
    const composed = composedFor(root, one)
    if ("refused" in composed) return { refused: composed.refused }
    changes.push({ path: composed.put.path, body: new TextEncoder().encode(composed.put.content) })
    paths.push(composed.put.path)
  }
  return { changes, paths }
}

export function landed(given: Given, changes: readonly FileEdit[], message: string): Answer {
  return landingAsked(given, {
    changes,
    message,
    dryRun: false,
    glass: null,
    unmoved: [],
    saying: wroteAndTook,
  })
}
