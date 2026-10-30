import type { ReadoutWidget } from "akasha/alan/harness/readout/widget/readout-widget.page-type.types.ts"

export const alanwaltonCost = {
  id: "01a08bb5-da56-760a-869f-9f74dc5bb31f",
  type: "page-type/readout-widget",
  slug: "alanwalton-cost",
  definition:
    "the readout widget on Alan's phone that shows the cost of each hour of Alan's current block",
  app: "ios-app/alanwalton",
  component: "ios-component/alanwalton-cost-widget",
  kind: "CostWidget",
  families: ["small"],
  feed: "https://alanwalton.com/api/cost",
  caption: "Cost",
  galleryName: "Cost",
  galleryDescription: "What an hour of the block you are in costs you.",
  opens: "capacitor://localhost/nav/tracking-690c624f#widget=alanwalton-cost",
  groups: ["readout-group/cost"],
  place: 12,
  createdAt: "2026-09-10T14:25:46.070Z",
  updatedAt: "2026-10-30T16:12:43.152Z",
} as const satisfies ReadoutWidget
