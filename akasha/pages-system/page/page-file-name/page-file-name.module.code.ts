import { basename } from "node:path"

const NAMED = /^(.+)\.([a-z0-9-]+)\.([a-z0-9]+)$/

const TS = ".ts"

const HELD_TS = "ts"

const UNCOMMITTED = "uncommitted"

const SOPS = "sops"

const HELD_YAML = "yaml"

export type Named = {
  readonly stem: string
  readonly tail: string
  readonly held: string
}

export type Kind = "page" | "property" | "uncommitted" | "secret" | "stray"

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
  const held = said[3]
  if (stem === undefined || tail === undefined || held === undefined) return null
  return { stem, tail, held }
}

export function pageNamed(path: string, pageTypes: ReadonlySet<string>): boolean {
  const said = namedIn(path)
  return (
    said !== null &&
    said.held === HELD_TS &&
    said.tail !== UNCOMMITTED &&
    said.tail !== SOPS &&
    pageTypes.has(said.tail)
  )
}

export function uncommittedNamed(path: string): boolean {
  return namedIn(path)?.tail === UNCOMMITTED
}

export function secretNamed(path: string): boolean {
  return namedIn(path)?.tail === SOPS
}

export function besideAt(path: string, propertySlug: string, held: string): string | null {
  if (!path.endsWith(TS)) return null
  return `${path.slice(0, -TS.length)}.${propertySlug}.${held}`
}

export function uncommittedAt(path: string): string | null {
  return besideAt(path, UNCOMMITTED, HELD_TS)
}

export function secretAt(path: string): string | null {
  return besideAt(path, SOPS, HELD_YAML)
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
  if (said.tail === UNCOMMITTED) {
    return {
      path,
      kind: "uncommitted",
      slug: null,
      pageTypeSlug: null,
      page: said.stem,
      propertySlug: null,
    }
  }
  if (said.tail === SOPS) {
    return {
      path,
      kind: "secret",
      slug: null,
      pageTypeSlug: null,
      page: said.stem,
      propertySlug: null,
    }
  }
  if (said.held === HELD_TS && pageTypes.has(said.tail)) {
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
