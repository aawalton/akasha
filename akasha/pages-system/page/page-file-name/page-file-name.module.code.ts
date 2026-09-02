import { basename } from "node:path"

const SEGMENT = /^[a-z0-9-]+$/

const HELD_PART = /^[a-z0-9]+$/

const LEAST = 3

const TS = ".ts"

const HELD_TS = "ts"

const UNCOMMITTED = "uncommitted"

const SOPS = "sops"

const HELD_YAML = "yaml"

export type Parted = {
  readonly slug: string
  readonly pageType: string
  readonly sections: readonly string[]
  readonly held: string
}

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
  readonly uncommitted: boolean
}

export function partedIn(path: string): Parted | null {
  const parts = basename(path).split(".")
  if (parts.length < LEAST) return null
  const slug = parts[0]
  const pageType = parts[1]
  const held = parts[parts.length - 1]
  if (slug === undefined || pageType === undefined || held === undefined) return null
  if (!SEGMENT.test(slug) || !SEGMENT.test(pageType) || !HELD_PART.test(held)) return null
  const sections = parts.slice(2, -1)
  if (sections.some((one) => !SEGMENT.test(one))) return null
  return { slug, pageType, sections, held }
}

export function namedIn(path: string): Named | null {
  const said = partedIn(path)
  if (said === null) return null
  const last = said.sections[said.sections.length - 1]
  if (last === undefined) return { stem: said.slug, tail: said.pageType, held: said.held }
  const stem = [said.slug, said.pageType, ...said.sections.slice(0, -1)].join(".")
  return { stem, tail: last, held: said.held }
}

function onlyIn(said: Parted): string | undefined {
  return said.sections.length === 1 ? said.sections[0] : undefined
}

function uncommittedPropertyIn(said: Parted): string | undefined {
  if (said.sections.length !== 2 || said.sections[1] !== UNCOMMITTED) return undefined
  return said.sections[0]
}

function pageIn(said: Parted, pageTypes: ReadonlySet<string>): boolean {
  return said.sections.length === 0 && said.held === HELD_TS && pageTypes.has(said.pageType)
}

export function pageNamed(path: string, pageTypes: ReadonlySet<string>): boolean {
  const said = partedIn(path)
  return said !== null && pageIn(said, pageTypes)
}

export function uncommittedNamed(path: string): boolean {
  const said = partedIn(path)
  return said !== null && onlyIn(said) === UNCOMMITTED
}

export function secretNamed(path: string): boolean {
  const said = partedIn(path)
  return said !== null && onlyIn(said) === SOPS
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

export function uncommittedBesideAt(
  path: string,
  propertySlug: string,
  held: string
): string | null {
  return besideAt(path, `${propertySlug}.${UNCOMMITTED}`, held)
}

function strayAt(path: string): Held {
  return {
    path,
    kind: "stray",
    slug: null,
    pageTypeSlug: null,
    page: null,
    propertySlug: null,
    uncommitted: false,
  }
}

export function heldIn(
  path: string,
  pageTypes: ReadonlySet<string>,
  fileProperties: ReadonlySet<string>
): Held {
  const said = partedIn(path)
  if (said === null) return strayAt(path)
  const page = `${said.slug}.${said.pageType}`
  const only = onlyIn(said)
  if (only === UNCOMMITTED) {
    return {
      path,
      kind: "uncommitted",
      slug: null,
      pageTypeSlug: null,
      page,
      propertySlug: null,
      uncommitted: true,
    }
  }
  if (only === SOPS) {
    return {
      path,
      kind: "secret",
      slug: null,
      pageTypeSlug: null,
      page,
      propertySlug: null,
      uncommitted: false,
    }
  }
  if (pageIn(said, pageTypes)) {
    return {
      path,
      kind: "page",
      slug: said.slug,
      pageTypeSlug: said.pageType,
      page,
      propertySlug: null,
      uncommitted: false,
    }
  }
  if (only !== undefined && fileProperties.has(only)) {
    return {
      path,
      kind: "property",
      slug: null,
      pageTypeSlug: null,
      page,
      propertySlug: only,
      uncommitted: false,
    }
  }
  const apart = uncommittedPropertyIn(said)
  if (apart !== undefined && fileProperties.has(apart)) {
    return {
      path,
      kind: "property",
      slug: null,
      pageTypeSlug: null,
      page,
      propertySlug: apart,
      uncommitted: true,
    }
  }
  return strayAt(path)
}
