import { basename } from "node:path"

const SEGMENT = /^[a-z0-9-]+$/

const HELD_PART = /^[a-z0-9]+$/

const LEAST = 3

const TS = ".ts"

const HELD_TS = "ts"

const UNCOMMITTED = "uncommitted"

const SOPS = "sops"

const HELD_YAML = "yaml"

const PART = /^part([2-9]|[1-9][0-9]+)$/

export const FIRST_PART = 1

export type Parted = {
  readonly slug: string
  readonly pageType: string
  readonly sections: readonly string[]
  readonly held: string
}

export type Slugged = {
  readonly pageTypeSlug: string
  readonly slug: string
}

export type Kind = "page" | "property" | "uncommitted" | "secret" | "stray"

export type Held = {
  readonly path: string
  readonly kind: Kind
  readonly slug: string | null
  readonly pageTypeSlug: string | null
  readonly page: string | null
  readonly propertySlug: string | null
  readonly part: number
  readonly uncommitted: boolean
}

export type Sectioned = {
  readonly propertySlug: string
  readonly part: number
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

export function pageOf(said: Parted): string {
  return `${said.slug}.${said.pageType}`
}

export function namedUnder(path: string, under: ReadonlySet<string>): Slugged | null {
  const said = partedIn(path)
  if (said === null || said.sections.length > 0) return null
  if (!under.has(said.pageType)) return null
  return { pageTypeSlug: said.pageType, slug: said.slug }
}

export function partIn(section: string | undefined): number | null {
  if (section === undefined) return null
  const found = PART.exec(section)
  return found === null ? null : Number(found[1])
}

export function sectionsIn(sections: readonly string[]): Sectioned | null {
  let held = sections
  const uncommitted = held.length > 1 && held[held.length - 1] === UNCOMMITTED
  if (uncommitted) held = held.slice(0, -1)
  let part = FIRST_PART
  if (held.length > 1) {
    const numbered = partIn(held[held.length - 1])
    if (numbered !== null) {
      part = numbered
      held = held.slice(0, -1)
    }
  }
  const only = held.length === 1 ? held[0] : undefined
  if (only === undefined) return null
  return { propertySlug: only, part, uncommitted }
}

export function sectionedIn(said: Parted): Sectioned | null {
  return sectionsIn(said.sections)
}

export function besideNamed(tail: string): boolean {
  const parts = tail.split(".")
  const held = parts[parts.length - 1]
  if (held === undefined || !HELD_PART.test(held)) return false
  const sections = parts.slice(0, -1)
  if (sections.some((one) => !SEGMENT.test(one))) return false
  return sectionsIn(sections) !== null
}

function onlyIn(said: Parted): string | undefined {
  const held = sectionedIn(said)
  if (held === null || held.part !== FIRST_PART || held.uncommitted) return undefined
  return held.propertySlug
}

function reserved(propertySlug: string): boolean {
  return propertySlug === UNCOMMITTED || propertySlug === SOPS
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
    part: FIRST_PART,
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
  const page = pageOf(said)
  const only = onlyIn(said)
  if (only === UNCOMMITTED) {
    return {
      path,
      kind: "uncommitted",
      slug: null,
      pageTypeSlug: null,
      page,
      propertySlug: null,
      part: FIRST_PART,
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
      part: FIRST_PART,
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
      part: FIRST_PART,
      uncommitted: false,
    }
  }
  const held = sectionedIn(said)
  if (held === null || reserved(held.propertySlug)) return strayAt(path)
  if (!fileProperties.has(held.propertySlug)) return strayAt(path)
  return {
    path,
    kind: "property",
    slug: null,
    pageTypeSlug: null,
    page,
    propertySlug: held.propertySlug,
    part: held.part,
    uncommitted: held.uncommitted,
  }
}
