import type { ReadoutWidget } from "akasha/alan/harness/readout/widget/readout-widget.page-type.types.ts"

export const smilingjennyFreshness = {
  id: "01a09b02-9b2b-7eee-a50d-8964f7922df5",
  type: "page-type/readout-widget",
  slug: "smilingjenny-freshness",
  definition:
    "the readout widget on Jenny's phone that shows how old the oldest readings on Jenny's phone are",
  app: "ios-app/smilingjenny",
  component: "ios-component/freshness-widget",
  kind: "FreshnessWidget",
  families: ["small"],
  caption: "Freshness",
  galleryName: "Freshness",
  galleryDescription: "How old the oldest reading on your tiles is. Tap to refresh them all.",
  place: 6,
  createdAt: "2026-09-13T13:43:54.411Z",
  updatedAt: "2026-10-30T16:07:44.080Z",
} as const satisfies ReadoutWidget
