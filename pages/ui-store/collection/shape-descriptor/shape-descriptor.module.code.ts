export interface ShapeDescriptor {
  readonly shapeKey: string
  readonly pageTypeSlug?: string
}

export function slugShapeDescriptor(slug: string): ShapeDescriptor {
  return { shapeKey: slug, pageTypeSlug: slug }
}

export const DEFINITION_TIER_SLUGS: ReadonlySet<string> = new Set([
  "page-type",
  "page-property-definition",
])

export function isDefinitionTierSlug(shapeKey: string): boolean {
  return DEFINITION_TIER_SLUGS.has(shapeKey)
}
