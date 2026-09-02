import type { ReadoutWidget } from "../readout-widget.page-type.ts"

export const alanwaltonSurplus = {
  id: "01a06420-b259-7c25-a46d-ddd74b4b9120",
  pageTypeSlug: "readout-widget",
  slug: "alanwalton-surplus",
  definition: "the tile on Alan's phone showing how much of his night the day has left him",
  appSlug: "alanwalton",
  componentSlug: "surplus-ring",
  kind: "SurplusWidget",
  families: ["small"],
  feed: "https://alanwalton.com/api/surplus",
  caption: "Surplus",
  galleryName: "Surplus",
  galleryDescription: "Hours of sleep left after what your day cost.",
  opens: "capacitor://localhost/nav/tracking-690c624f?tab=20f5f031-8fa1-44d2-be3a-561b457548f1",
  groupSlugs: ["surplus"],
  place: 10,
} as const satisfies ReadoutWidget
