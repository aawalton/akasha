import type { ReadoutWidget } from "../readout-widget.page-type.types.ts"

export const smilingjennyCost = {
  id: "01a08bb5-efd9-7b30-b422-c38449b55e6d",
  pageTypeSlug: "readout-widget",
  type: "readout-widget",
  slug: "smilingjenny-cost",
  definition: "the tile on Jenny's phone showing what the block Alan is in costs him each hour",
  app: "smilingjenny",
  component: "smilingjenny-cost-widget",
  kind: "CostWidget",
  families: ["small"],
  feed: "https://smilingjenny.me/api/cost",
  caption: "Alan's Cost",
  galleryName: "Cost",
  galleryDescription: "What an hour of the block Alan is in costs him.",
  groups: ["cost"],
  place: 4,
} as const satisfies ReadoutWidget
