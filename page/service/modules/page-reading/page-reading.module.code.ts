import { textOf } from "akasha/code/body/modules/body-text/body-text.module.code.ts"
import {
  baseOf,
  changeOf,
  diskAt,
} from "akasha/command/modules/landing-change-composing/landing-change-composing.module.code.ts"
import { commitThere } from "akasha/git/modules/commit-reading/commit-reading.module.code.ts"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  secretNamed,
  uncommittedHeld,
  uncommittedNamed,
} from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import type { Faulted } from "akasha/page/service/modules/refusal-fault/refusal-fault.module.code.ts"

export type Named = {
  readonly pageTypeSlug: string
  readonly slug: string
}

export type Asked = {
  readonly paths?: readonly string[]
  readonly pages?: readonly Named[]
  readonly at?: string
}

export type Body = {
  readonly path: string
  readonly content: string | null
}

export type Read =
  | {
      readonly at: string
      readonly bodies: readonly Body[]
      readonly unplaced: readonly string[]
    }
  | { readonly refused: string; readonly withheld?: true }

export type Reading = {
  readonly root: string
}

export type Found = { readonly path: string }

export type Placing = (root: string, pageTypeSlug: string, slug: string) => readonly Found[]

const ABOVE = ".."

const PARTED_BY = "/"

const placing: Placing = listedAt

export function namedIn(one: Named): string {
  return `${one.pageTypeSlug}/${one.slug}`
}

function withheldIn(path: string): string | null {
  if (secretNamed(path)) {
    return `\`${path}\` holds a page's secret values, and this hands out no secret`
  }
  if (uncommittedNamed(path)) {
    return `\`${path}\` holds a page's uncommitted values, and this hands out no uncommitted value`
  }
  return null
}

export function withheldAmong(paths: readonly string[]): string | null {
  for (const one of paths) {
    const withheld = withheldIn(one)
    if (withheld !== null) return withheld
  }
  return null
}

export function refusalIn(asked: Asked): string | null {
  const paths = asked.paths ?? []
  const pages = asked.pages ?? []
  if (paths.length === 0 && pages.length === 0) {
    return "a read carries at least one path or one page"
  }
  for (const one of paths) {
    if (one === "" || one.startsWith(PARTED_BY)) {
      return `\`${one}\` is no path inside the repository, and this reads what the repository holds`
    }
    if (one.split(PARTED_BY).includes(ABOVE)) return `\`${one}\` reaches above the root`
  }
  for (const one of pages) {
    if (one.pageTypeSlug === "" || one.slug === "") {
      return "a page names a page type and a slug, and neither is empty"
    }
  }
  return null
}

export type Placed =
  | { readonly paths: readonly string[]; readonly unplaced: readonly string[] }
  | { readonly refused: string }

export function placedIn(root: string, asked: Asked, places: Placing = placing): Placed {
  const paths: string[] = [...(asked.paths ?? [])]
  const unplaced: string[] = []
  for (const one of asked.pages ?? []) {
    const listed = places(root, one.pageTypeSlug, one.slug)
    if (listed.length > 1) {
      return {
        refused: `\`${namedIn(one)}\` stands at ${listed.length} paths, so no one body is the page's`,
      }
    }
    const first = listed[0]
    if (first === undefined) unplaced.push(namedIn(one))
    else paths.push(first.path)
  }
  return { paths, unplaced }
}

export function reading(given: Reading, asked: Asked, places: Placing = placing): Faulted<Read> {
  const refused = refusalIn(asked)
  if (refused !== null) return { refused, fault: "caller" }
  const asking = withheldAmong(asked.paths ?? [])
  if (asking !== null) return { refused: asking, withheld: true, fault: "caller" }
  try {
    const named = asked.at
    if (named !== undefined && !commitThere(given.root, named)) {
      const unnamed = `\`${named}\` names no commit here, and a read answers out of a commit`
      return { refused: unnamed, fault: "caller" }
    }
    const placed = placedIn(given.root, asked, places)
    if ("refused" in placed) return { refused: placed.refused, fault: "service" }
    const withheld = withheldAmong(placed.paths)
    if (withheld !== null) return { refused: withheld, withheld: true, fault: "caller" }
    const at = named ?? baseOf(given.root)
    const change = changeOf(given.root, at, [])
    const bodies = placed.paths.map((one) => ({
      path: one,
      content: textOf(uncommittedHeld(one) ? diskAt(given.root, one) : change.before(one)),
    }))
    return { at, bodies, unplaced: placed.unplaced }
  } catch (thrown) {
    return { refused: String(thrown), fault: "service" }
  }
}
