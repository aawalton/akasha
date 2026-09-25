import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import { FILE_PROPERTY } from "akasha/page/index/modules/entries/index-entries.module.code.ts"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { uncommittedBesideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { mergeUncommitted } from "akasha/page/modules/uncommitted/page-uncommitted.module.code.ts"
import { valueAt } from "akasha/page/modules/value/page-value.module.code.ts"
import {
  textsAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { carriedFor } from "akasha/page/service/modules/kinds-gathering/kinds-gathering.module.code.ts"
import type { Faulted } from "akasha/page/service/modules/refusal-fault/refusal-fault.module.code.ts"
import type { Carried } from "akasha/page/type/modules/declared-properties/declared-properties.module.code.ts"

const EXTENSIONS = "extensions"

export type Placing = {
  readonly pageTypeSlug: string
  readonly slug: string
  readonly key: string
  readonly ending: string
  readonly bytes: Uint8Array
}

export type Placed = { readonly placed: string } | { readonly refused: string }

export type Landing = {
  readonly write: (at: string, bytes: Uint8Array) => undefined
  readonly remember: (page: string, values: Value) => undefined
}

function landingIn(root: string): Landing {
  return {
    write: (at, bytes) => {
      const full = join(root, at)
      mkdirSync(dirname(full), { recursive: true })
      writeFileSync(full, bytes)
    },
    remember: (page, values) => mergeUncommitted(root, page, values),
  }
}

function endingsOf(root: string, carried: Carried): readonly string[] {
  const listed = listedAt(root, carried.pageTypeSlug, carried.pagePropertySlug)
  const first = listed.length === 1 ? listed[0] : undefined
  if (first === undefined) return []
  const value = valueAt(first.path, root)
  return value === null ? [] : (textsAt(value, EXTENSIONS) ?? [])
}

function namedIn(asked: Placing): string {
  return `${asked.pageTypeSlug}/${asked.slug}`
}

export function placing(
  root: string,
  asked: Placing,
  landing: Landing = landingIn(root)
): Faulted<Placed> {
  const carried = carriedFor(root, asked.pageTypeSlug).find((one) => one.key === asked.key)
  if (carried === undefined) {
    return { refused: `\`${asked.pageTypeSlug}\` has no \`${asked.key}\``, fault: "caller" }
  }
  if (carried.pageTypeSlug !== FILE_PROPERTY) {
    return {
      refused: `\`${asked.key}\` names no file property, so no bytes sit beside a page under it`,
      fault: "caller",
    }
  }
  if (carried.secret) return { refused: `\`${asked.key}\` is held secret`, fault: "caller" }
  if (!carried.uncommitted) {
    return {
      refused: `\`${asked.key}\` is committed, and a committed file lands through a write`,
      fault: "caller",
    }
  }
  const endings = endingsOf(root, carried)
  if (!endings.includes(asked.ending)) {
    const named = endings.map((one) => `\`${one}\``).join(", ")
    return {
      refused: `\`${asked.key}\` is held under ${named}, and \`${asked.ending}\` is none of those`,
      fault: "caller",
    }
  }
  const listed = listedAt(root, asked.pageTypeSlug, asked.slug)
  if (listed.length > 1) {
    return { refused: `\`${namedIn(asked)}\` sits at ${listed.length} paths`, fault: "service" }
  }
  const page = listed[0]?.path
  if (page === undefined) {
    return {
      refused: `\`${namedIn(asked)}\` is no page here, so nothing is placed beside it`,
      fault: "caller",
    }
  }
  const at = uncommittedBesideAt(page, carried.propertySlug, asked.ending)
  if (at === null) {
    return { refused: `\`${page}\` is no page file, so nothing sits beside it`, fault: "service" }
  }
  try {
    landing.write(at, asked.bytes)
    landing.remember(page, { [asked.key]: asked.ending })
  } catch (thrown) {
    return { refused: saidBy(thrown), fault: "service" }
  }
  return { placed: at }
}
