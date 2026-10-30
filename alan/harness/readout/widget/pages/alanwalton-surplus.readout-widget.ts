import type { ReadoutWidget } from "akasha/alan/harness/readout/widget/readout-widget.page-type.types.ts"

export const alanwaltonSurplus = {
  id: "01a06420-b259-7c25-a46d-ddd74b4b9120",
  type: "page-type/readout-widget",
  slug: "alanwalton-surplus",
  definition: "the readout widget on Alan's phone that shows Alan's surplus",
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
  updatedAt: "2026-10-30T15:59:33.055Z",
} as const satisfies ReadoutWidget
