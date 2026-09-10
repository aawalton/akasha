import type { ReadoutWidget } from "../readout-widget.page-type.types.ts"

export const smilingjennySafetyLevel = {
  id: "01a06420-b259-70dc-adcb-88ca53d210cf",
  pageTypeSlug: "readout-widget",
  type: "readout-widget",
  slug: "smilingjenny-safety-level",
  definition: "the tile on Jenny's phone showing how safe things are where Alan is",
  app: "smilingjenny",
  component: "smilingjenny-safety-level-widget",
  kind: "SafetyLevelWidget",
  families: ["small"],
  feed: "https://smilingjenny.me/api/safety-level",
  caption: "Alan's Safety",
  galleryName: "Safety",
  galleryDescription: "Where Alan's safety level is today.",
  groups: ["safety"],
  place: 2,
} as const satisfies ReadoutWidget
