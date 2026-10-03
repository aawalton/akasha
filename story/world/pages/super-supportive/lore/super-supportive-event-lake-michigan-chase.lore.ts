import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const superSupportiveEventLakeMichiganChase = {
  id: "01a0e9fc-7b33-7c39-ab02-78e18104bc3d",
  type: "page-type/lore",
  slug: "super-supportive-event-lake-michigan-chase",
  title: "Skiff's Lake Michigan chase",
  world: "world/super-supportive",
  facts: [
    {
      fact: "In the winter before Hannah's funeral, Skiff chased an earth-shaping villain in Chicago.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The villain was drowned and ended up in intensive care.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-iii-nala"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
