import type { ReadoutWidget } from "akasha/alan/harness/readout/widget/readout-widget.page-type.types.ts"

export const smilingjennyCost = {
  id: "01a08bb5-efd9-7b30-b422-c38449b55e6d",
  type: "page-type/readout-widget",
  slug: "smilingjenny-cost",
  definition:
    "the readout widget on Jenny's phone that shows the cost of each hour of Alan's current block",
  app: "ios-app/smilingjenny",
  component: "ios-component/smilingjenny-cost-widget",
  kind: "CostWidget",
  families: ["small"],
  feed: "https://smilingjenny.me/api/cost",
  caption: "Alan's Cost",
  galleryName: "Cost",
  galleryDescription: "What an hour of the block Alan is in costs him.",
  groups: ["readout-group/cost"],
  place: 4,
  createdAt: "2026-09-10T14:25:51.577Z",
  updatedAt: "2026-10-30T16:00:49.648Z",
} as const satisfies ReadoutWidget
