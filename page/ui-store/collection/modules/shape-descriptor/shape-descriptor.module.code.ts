export type NamedPages =
  | { readonly by: "id" | "slug"; readonly values: readonly string[] }
  | { readonly by: "where"; readonly key: string; readonly values: readonly string[] }

export function namedParam(named: NamedPages): string {
  return named.by === "where" ? `where.${named.key}` : named.by
}

export interface ShapeDescriptor {
  readonly shapeKey: string
  readonly pageTypeSlug?: string
  readonly named?: NamedPages
}

export function slugShapeDescriptor(slug: string): ShapeDescriptor {
  return { shapeKey: slug, pageTypeSlug: slug }
}

export function namedShapeKey(pageTypeSlug: string, named: NamedPages): string {
  return `${pageTypeSlug}?${namedParam(named)}=${named.values.join(",")}`
}

export function namedShapeDescriptor(pageTypeSlug: string, named: NamedPages): ShapeDescriptor {
  return { shapeKey: namedShapeKey(pageTypeSlug, named), pageTypeSlug, named }
}

const DEFINITION_TIER_SLUGS: ReadonlySet<string> = new Set(["page-type"])

export function isDefinitionTierSlug(shapeKey: string): boolean {
  return DEFINITION_TIER_SLUGS.has(shapeKey)
}
