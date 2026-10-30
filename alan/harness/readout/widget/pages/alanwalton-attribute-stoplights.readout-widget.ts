import type { ReadoutWidget } from "akasha/alan/harness/readout/widget/readout-widget.page-type.types.ts"

export const alanwaltonAttributeStoplights = {
  id: "01a06858-8cfa-7178-8e79-50dece17aecf",
  type: "page-type/readout-widget",
  slug: "alanwalton-attribute-stoplights",
  definition: "the readout widget on Alan's phone that shows the points his attributes earn today",
  app: "ios-app/alanwalton",
  component: "ios-component/alanwalton-attribute-stoplights-widget",
  kind: "AttributeStoplightsWidget",
  families: ["small"],
  feed: "https://alanwalton.com/api/attribute-stoplights",
  galleryName: "Attributes",
  galleryDescription: "Your six attribute stoplights, at a glance.",
  opens:
    "capacitor://localhost/nav/attributes-970234ac?tab=01a07cd7-2bb6-7d40-acb4-895746f0208f#widget=alanwalton-attribute-stoplights",
  groups: ["readout-group/attributes"],
  place: 11,
  createdAt: "2026-09-03T17:37:08.858Z",
  updatedAt: "2026-10-30T16:11:39.487Z",
} as const satisfies ReadoutWidget
