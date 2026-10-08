import type { ReadoutWidget } from "akasha/alan/harness/readout/widget/readout-widget.page-type.types.ts"

export const alanwaltonSurplus = {
  id: "01a06420-b259-7c25-a46d-ddd74b4b9120",
  type: "page-type/readout-widget",
  slug: "alanwalton-surplus",
  definition: "the tile on Alan's phone showing how much of his night the day has left him",
  app: "ios-app/alanwalton",
  component: "ios-component/surplus-ring",
  kind: "SurplusWidget",
  families: ["small"],
  feed: "https://alanwalton.com/api/surplus",
  caption: "Surplus",
  galleryName: "Surplus",
  galleryDescription: "Hours of sleep left after what your day cost.",
  opens:
    "capacitor://localhost/nav/tracking-690c624f?tab=20f5f031-8fa1-44d2-be3a-561b457548f1#widget=alanwalton-surplus",
  groups: ["readout-group/surplus"],
  place: 10,
  createdAt: "2026-09-02T21:57:39.545Z",
  updatedAt: "2026-09-15T16:23:51.000Z",
} as const satisfies ReadoutWidget
