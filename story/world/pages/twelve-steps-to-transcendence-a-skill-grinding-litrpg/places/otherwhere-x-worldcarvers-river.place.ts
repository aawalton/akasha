import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereXWorldcarversRiver = {
  id: "01a0ea7c-271a-73d5-aad8-d13dea397d54",
  type: "page-type/place",
  slug: "otherwhere-x-worldcarvers-river",
  title: "The Worldcarver's River",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  within: "place/otherwhere-x-western-plains",
  facts: [
    {
      fact: "The Worldcarver's River runs from its source near the Wall all the way to the Sea.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Worldcarver carved the river's path after forging the regional walls.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Haven Academy lies near the ocean at the river's end.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Each expedition follows the river from source to Sea, braving the wilds to reach the academy.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The river's upper reaches wind through wild forest near the Wall, far from civilization.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Towns lie along the expedition's way downriver.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
