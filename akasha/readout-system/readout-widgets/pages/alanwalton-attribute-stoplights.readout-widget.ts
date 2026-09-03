import type { ReadoutWidget } from "../readout-widget.page-type.ts"

export const alanwaltonAttributeStoplights = {
  id: "01a06858-8cfa-7178-8e79-50dece17aecf",
  pageTypeSlug: "readout-widget",
  slug: "alanwalton-attribute-stoplights",
  definition: "the tile on Alan's phone showing what each of his attributes earned today",
  appSlug: "alanwalton",
  componentSlug: "alanwalton-attribute-stoplights-widget",
  kind: "AttributeStoplightsWidget",
  families: ["small"],
  feed: "https://alanwalton.com/api/attribute-stoplights",
  galleryName: "Attributes",
  galleryDescription: "Your six attribute stoplights, at a glance.",
  groupSlugs: ["attributes"],
  place: 11,
} as const satisfies ReadoutWidget
