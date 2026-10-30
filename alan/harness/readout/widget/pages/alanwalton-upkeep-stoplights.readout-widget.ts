import type { ReadoutWidget } from "akasha/alan/harness/readout/widget/readout-widget.page-type.types.ts"

export const alanwaltonUpkeepStoplights = {
  id: "01a06420-b259-7c2d-889c-333cb1144c67",
  type: "page-type/readout-widget",
  slug: "alanwalton-upkeep-stoplights",
  definition: "the readout widget on Alan's phone that shows whether Alan looks after himself",
  app: "ios-app/alanwalton",
  component: "ios-component/alanwalton-upkeep-stoplights-widget",
  kind: "HabitStoplightsWidget",
  families: ["small"],
  feed: "https://alanwalton.com/api/habit-stoplights",
  galleryName: "Upkeep",
  galleryDescription: "Your four upkeep stoplights, at a glance.",
  opens:
    "capacitor://localhost/nav/tracking-690c624f?tab=20f5f031-8fa1-44d2-be3a-561b457548f1#widget=alanwalton-upkeep-stoplights",
  groups: ["readout-group/upkeep"],
  place: 6,
  createdAt: "2026-09-02T21:57:39.545Z",
  updatedAt: "2026-10-30T16:08:11.624Z",
} as const satisfies ReadoutWidget
