import type { ReadoutWidget } from "akasha/alan/harness/readout/widget/readout-widget.page-type.types.ts"

export const smilingjennyFreshness = {
  id: "01a09b02-9b2b-7eee-a50d-8964f7922df5",
  type: "page-type/readout-widget",
  slug: "smilingjenny-freshness",
  definition: "the tile on Jenny's phone saying how old the oldest reading her tiles hold is",
  app: "ios-app/smilingjenny",
  component: "ios-component/freshness-widget",
  kind: "FreshnessWidget",
  families: ["small"],
  caption: "Freshness",
  galleryName: "Freshness",
  galleryDescription: "How old the oldest reading on your tiles is. Tap to refresh them all.",
  place: 6,
  createdAt: "2026-09-13T13:43:54.411Z",
  updatedAt: "2026-09-15T16:23:51.000Z",
} as const satisfies ReadoutWidget
