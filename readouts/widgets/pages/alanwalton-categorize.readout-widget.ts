import type { ReadoutWidget } from "../readout-widget.page-type.ts"

export const alanwaltonCategorize = {
  id: "01a054d1-d1a4-72af-8c87-d77add25efb9",
  pageTypeSlug: "readout-widget",
  type: "readout-widget",
  slug: "alanwalton-categorize",
  definition: "the tile on Alan's phone showing how many transactions are unreviewed",
  app: "alanwalton",
  component: "categorize-ring",
  kind: "CategorizeWidget",
  families: ["small"],
  feed: "https://alanwalton.com/api/categorization",
  galleryName: "Left to Review",
  galleryDescription:
    "How many of the past year's transactions Monarch is waiting to have reviewed.",
  opens: "capacitor://monarch-relay#widget=alanwalton-categorize",
  groups: ["categorization"],
  place: 7,
} as const satisfies ReadoutWidget
