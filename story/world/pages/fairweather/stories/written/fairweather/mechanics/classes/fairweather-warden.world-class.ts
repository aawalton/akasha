import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const fairweatherWarden = {
  id: "01a102af-305c-7edc-92ed-976fb1ade821",
  type: "page-type/world-class",
  slug: "fairweather-warden",
  title: "Warden",
  world: "world/fairweather",
  description:
    "A class that breaks and suppresses bindings: the ties of power one person lays on another. The Adventurers' Guild employs Wardens to watch the classes it restricts.",
} as const satisfies WorldClass
