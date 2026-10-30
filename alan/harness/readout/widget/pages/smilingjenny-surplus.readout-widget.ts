import type { ReadoutWidget } from "akasha/alan/harness/readout/widget/readout-widget.page-type.types.ts"

export const smilingjennySurplus = {
  id: "01a06420-b259-7376-aefb-fb19cf9d5cd2",
  type: "page-type/readout-widget",
  slug: "smilingjenny-surplus",
  definition: "the readout widget on Jenny's phone that shows Alan's surplus",
  app: "ios-app/smilingjenny",
  component: "ios-component/surplus-ring",
  kind: "SurplusWidget",
  families: ["small"],
  feed: "https://smilingjenny.me/api/surplus",
  caption: "Alan's Surplus",
  galleryName: "Surplus",
  galleryDescription: "Hours of sleep left after what Alan's day cost.",
  groups: ["readout-group/surplus"],
  place: 3,
  createdAt: "2026-09-02T21:57:39.545Z",
  updatedAt: "2026-10-30T16:00:09.927Z",
} as const satisfies ReadoutWidget
