import type { ReadoutWidget } from "../readout-widget.page-type.types.ts"

export const smilingjennySurplus = {
  id: "01a06420-b259-7376-aefb-fb19cf9d5cd2",
  pageTypeSlug: "readout-widget",
  type: "readout-widget",
  slug: "smilingjenny-surplus",
  definition: "the tile on Jenny's phone showing how much of Alan's night the day has left him",
  app: "smilingjenny",
  component: "surplus-ring",
  kind: "SurplusWidget",
  families: ["small"],
  feed: "https://smilingjenny.me/api/surplus",
  caption: "Alan's Surplus",
  galleryName: "Surplus",
  galleryDescription: "Hours of sleep left after what Alan's day cost.",
  groups: ["surplus"],
  place: 3,
} as const satisfies ReadoutWidget
