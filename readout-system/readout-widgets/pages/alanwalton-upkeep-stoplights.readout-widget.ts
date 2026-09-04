import type { ReadoutWidget } from "../readout-widget.page-type.ts"

export const alanwaltonUpkeepStoplights = {
  id: "01a06420-b259-7c2d-889c-333cb1144c67",
  pageTypeSlug: "readout-widget",
  slug: "alanwalton-upkeep-stoplights",
  definition: "the tile on Alan's phone showing whether his upkeep is working",
  appSlug: "alanwalton",
  componentSlug: "alanwalton-upkeep-stoplights-widget",
  kind: "HabitStoplightsWidget",
  families: ["small"],
  feed: "https://alanwalton.com/api/habit-stoplights",
  galleryName: "Upkeep",
  galleryDescription: "Your four upkeep stoplights, at a glance.",
  opens: "capacitor://localhost/nav/tracking-690c624f?tab=20f5f031-8fa1-44d2-be3a-561b457548f1",
  groupSlugs: ["upkeep"],
  place: 6,
} as const satisfies ReadoutWidget
