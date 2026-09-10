import type { ReadoutWidget } from "../readout-widget.page-type.types.ts"

export const alanwaltonCost = {
  id: "01a08bb5-da56-760a-869f-9f74dc5bb31f",
  pageTypeSlug: "readout-widget",
  type: "readout-widget",
  slug: "alanwalton-cost",
  definition: "the tile on Alan's phone showing what the block he is in costs him each hour",
  app: "alanwalton",
  component: "alanwalton-cost-widget",
  kind: "CostWidget",
  families: ["small"],
  feed: "https://alanwalton.com/api/cost",
  caption: "Cost",
  galleryName: "Cost",
  galleryDescription: "What an hour of the block you are in costs you.",
  opens: "capacitor://localhost/nav/tracking-690c624f#widget=alanwalton-cost",
  groups: ["cost"],
  place: 12,
} as const satisfies ReadoutWidget
