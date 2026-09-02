import type { ReadoutWidget } from "../readout-widget.page-type.ts"

export const smilingjennyCategorize = {
  id: "01a05bc7-0b84-7700-8d53-60de383bacaa",
  pageTypeSlug: "readout-widget",
  slug: "smilingjenny-categorize",
  definition: "the tile on Jenny's phone showing how many transactions are unreviewed",
  appSlug: "smilingjenny",
  componentSlug: "categorize-ring",
  kind: "CategorizeWidget",
  families: ["small"],
  feed: "https://smilingjenny.me/api/categorization",
  galleryName: "Left to Review",
  galleryDescription:
    "How many of the past year's transactions Monarch is waiting to have reviewed.",
  opens: "capacitor://monarch-relay",
  groupSlugs: ["categorization"],
  place: 1,
} as const satisfies ReadoutWidget
