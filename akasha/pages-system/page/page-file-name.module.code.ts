import { basename } from "node:path"
const NAMED = /^(.+)\.([a-z0-9-]+)\.ts$/

const TS = ".ts"

export type Named = {
  readonly stem: string
  readonly tail: string
}

export type Kind = "page" | "property" | "stray"

export type Held = {
  readonly path: string
  readonly kind: Kind
  readonly slug: string | null
  readonly pageTypeSlug: string | null
  readonly page: string | null
  readonly propertySlug: string | null
}

export function namedIn(path: string): Named | null {
  const said = NAMED.exec(basename(path))
  if (said === null) return null
  const stem = said[1]
  const tail = said[2]
  if (stem === undefined || tail === undefined) return null
  return { stem, tail }
}

export function pageNamed(path: string, pageTypes: ReadonlySet<string>): boolean {
  const said = namedIn(path)
  return said !== null && pageTypes.has(said.tail)
}

export function besideAt(path: string, propertySlug: string, held: string): string | null {
  if (!path.endsWith(TS)) return null
  return `${path.slice(0, -TS.length)}.${propertySlug}.${held}`
}

export function heldIn(
  path: string,
  pageTypes: ReadonlySet<string>,
  fileProperties: ReadonlySet<string>
): Held {
  const said = namedIn(path)
  if (said === null) {
    return { path, kind: "stray", slug: null, pageTypeSlug: null, page: null, propertySlug: null }
  }
  if (pageTypes.has(said.tail)) {
    return {
      path,
      kind: "page",
      slug: said.stem,
      pageTypeSlug: said.tail,
      page: `${said.stem}.${said.tail}`,
      propertySlug: null,
    }
  }
  if (fileProperties.has(said.tail)) {
    return {
      path,
      kind: "property",
      slug: null,
      pageTypeSlug: null,
      page: said.stem,
      propertySlug: said.tail,
    }
  }
  return { path, kind: "stray", slug: null, pageTypeSlug: null, page: null, propertySlug: null }
}
