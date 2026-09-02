import { textOf } from "@akasha/code-system/body-text"
import { baseOf, changeOf } from "@akasha/command-system/landing"
import { listedAt } from "@akasha/indexes"
import { secretNamed, uncommittedNamed } from "@akasha/pages-system/page-file-name"

export type Named = {
  readonly pageTypeSlug: string
  readonly slug: string
}

export type Asked = {
  readonly paths?: readonly string[]
  readonly pages?: readonly Named[]
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
  | { readonly refused: string }

export type Reading = {
  readonly root: string
}

export type Found = { readonly path: string }

export type Placing = (root: string, pageTypeSlug: string, slug: string) => readonly Found[]

const UNDER = "akasha/"

const ABOVE = ".."

export const placing: Placing = listedAt

export function namedIn(one: Named): string {
  return `${one.pageTypeSlug}/${one.slug}`
}

export function withheldIn(path: string): string | null {
  if (secretNamed(path)) {
    return `\`${path}\` holds a page's secret values, and this hands out no secret`
  }
  if (uncommittedNamed(path)) {
    return `\`${path}\` holds a page's uncommitted values, and this hands out no uncommitted value`
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
    if (!one.startsWith(UNDER)) {
      return `\`${one}\` stands outside \`${UNDER}\`, and this answers for akasha alone`
    }
    if (one.split("/").includes(ABOVE)) return `\`${one}\` reaches above the root`
    const withheld = withheldIn(one)
    if (withheld !== null) return withheld
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

export function reading(given: Reading, asked: Asked, places: Placing = placing): Read {
  const refused = refusalIn(asked)
  if (refused !== null) return { refused }
  try {
    const placed = placedIn(given.root, asked, places)
    if ("refused" in placed) return placed
    for (const one of placed.paths) {
      const withheld = withheldIn(one)
      if (withheld !== null) return { refused: withheld }
    }
    const at = baseOf(given.root)
    const change = changeOf(given.root, { base: at, edits: [] })
    const bodies = placed.paths.map((one) => ({ path: one, content: textOf(change.before(one)) }))
    return { at, bodies, unplaced: placed.unplaced }
  } catch (thrown) {
    return { refused: String(thrown) }
  }
}
