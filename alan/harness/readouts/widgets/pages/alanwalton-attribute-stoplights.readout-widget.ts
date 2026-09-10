import type { ReadoutWidget } from "../readout-widget.page-type.types.ts"

export const alanwaltonAttributeStoplights = {
  id: "01a06858-8cfa-7178-8e79-50dece17aecf",
  pageTypeSlug: "readout-widget",
  type: "readout-widget",
  slug: "alanwalton-attribute-stoplights",
  definition: "the tile on Alan's phone showing what each of his attributes earned today",
  app: "alanwalton",
  component: "alanwalton-attribute-stoplights-widget",
  kind: "AttributeStoplightsWidget",
  families: ["small"],
  feed: "https://alanwalton.com/api/attribute-stoplights",
  galleryName: "Attributes",
  galleryDescription: "Your six attribute stoplights, at a glance.",
  opens:
    "capacitor://localhost/nav/attributes-970234ac?tab=01a07cd7-2bb6-7d40-acb4-895746f0208f#widget=alanwalton-attribute-stoplights",
  groups: ["attributes"],
  place: 11,
} as const satisfies ReadoutWidget
