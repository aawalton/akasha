import type { ReadoutWidget } from "akasha/alan/harness/readouts/widgets/readout-widget.page-type.types.ts"

export const smilingjennyUpkeepStoplights = {
  id: "01a08bf3-8081-756b-b9b4-131b64992b41",
  pageTypeSlug: "readout-widget",
  type: "readout-widget",
  slug: "smilingjenny-upkeep-stoplights",
  definition: "the tile on Jenny's phone showing whether Alan's daily upkeep is holding",
  app: "smilingjenny",
  component: "smilingjenny-upkeep-stoplights-widget",
  kind: "HabitStoplightsWidget",
  families: ["small"],
  feed: "https://smilingjenny.me/api/upkeep",
  galleryName: "Upkeep",
  galleryDescription: "Alan's four upkeep stoplights, at a glance.",
  groups: ["upkeep"],
  place: 5,
} as const satisfies ReadoutWidget
