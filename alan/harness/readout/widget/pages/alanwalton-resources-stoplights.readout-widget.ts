import type { ReadoutWidget } from "akasha/alan/harness/readout/widget/readout-widget.page-type.types.ts"

export const alanwaltonResourcesStoplights = {
  id: "01a14f45-ad96-7880-8195-e872fc39df67",
  type: "page-type/readout-widget",
  slug: "alanwalton-resources-stoplights",
  definition: "the tile on Alan's phone showing the resources his day runs on",
  app: "ios-app/alanwalton",
  component: "ios-component/alanwalton-resources-stoplights-widget",
  kind: "ResourcesStoplightsWidget",
  families: ["small"],
  feed: "https://alanwalton.com/api/resources-stoplights",
  galleryName: "Resources",
  galleryDescription: "Your six resource stoplights, at a glance.",
  opens:
    "capacitor://localhost/nav/tracking-690c624f?tab=20f5f031-8fa1-44d2-be3a-561b457548f1#widget=alanwalton-resources-stoplights",
  groups: ["readout-group/resources"],
  place: 14,
  createdAt: "2026-10-18T13:48:48.917Z",
  updatedAt: "2026-10-18T13:48:48.917Z",
} as const satisfies ReadoutWidget
