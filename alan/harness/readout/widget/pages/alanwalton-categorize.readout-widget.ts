import type { ReadoutWidget } from "akasha/alan/harness/readout/widget/readout-widget.page-type.types.ts"

export const alanwaltonCategorize = {
  id: "01a054d1-d1a4-72af-8c87-d77add25efb9",
  type: "page-type/readout-widget",
  slug: "alanwalton-categorize",
  definition: "the tile on Alan's phone showing how many transactions are unreviewed",
  app: "ios-app/alanwalton",
  component: "ios-component/categorize-ring",
  kind: "CategorizeWidget",
  families: ["small"],
  feed: "https://alanwalton.com/api/categorization",
  galleryName: "Left to Review",
  galleryDescription:
    "How many of the past year's transactions Monarch is waiting to have reviewed.",
  opens: "capacitor://monarch-relay#widget=alanwalton-categorize",
  groups: ["readout-group/categorization"],
  place: 7,
  createdAt: "2026-08-30T22:37:11.972Z",
  updatedAt: "2026-09-15T16:23:51.000Z",
} as const satisfies ReadoutWidget
