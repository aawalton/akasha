import type { ReadoutWidget } from "akasha/alan/harness/readout/widget/readout-widget.page-type.types.ts"

export const alanwaltonFreshness = {
  id: "01a09b02-838e-78c6-9f19-32ed032ab747",
  type: "page-type/readout-widget",
  slug: "alanwalton-freshness",
  definition: "the tile on Alan's phone saying how old the oldest reading his tiles hold is",
  app: "ios-app/alanwalton",
  component: "ios-component/freshness-widget",
  kind: "FreshnessWidget",
  families: ["small"],
  caption: "Freshness",
  galleryName: "Freshness",
  galleryDescription: "How old the oldest reading on your tiles is. Tap to refresh them all.",
  place: 13,
  createdAt: "2026-09-13T13:43:48.366Z",
  updatedAt: "2026-09-15T16:23:51.000Z",
} as const satisfies ReadoutWidget
