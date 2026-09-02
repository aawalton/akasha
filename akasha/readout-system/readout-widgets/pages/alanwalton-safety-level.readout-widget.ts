import type { ReadoutWidget } from "../readout-widget.page-type.ts"

export const alanwaltonSafetyLevel = {
  id: "01a06420-b259-7d0c-85e8-0e67ee23e107",
  pageTypeSlug: "readout-widget",
  slug: "alanwalton-safety-level",
  definition: "the tile on Alan's phone showing how safe things are where he is",
  appSlug: "alanwalton",
  componentSlug: "alanwalton-safety-level-widget",
  kind: "SafetyLevelWidget",
  families: ["small"],
  feed: "https://alanwalton.com/api/safety-level",
  caption: "Safety",
  galleryName: "Safety",
  galleryDescription: "Where your safety level stands today.",
  opens: "capacitor://localhost/nav/tracking-690c624f?tab=019edbf5-d4ea-7380-a6be-bc7496dbb24c",
  groupSlugs: ["safety"],
  place: 9,
} as const satisfies ReadoutWidget
