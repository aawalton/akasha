import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00039 = {
  id: "01a0e559-09a7-7c41-a232-2aa0086de381",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-039",
  ownLength: 125,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 39,
  prose: "txt",
  characters: ["character-player/otherwhere-alan"],
  turnStatus: "turn-status/reviewers",
  action:
    "I put on a robe and slippers and tie it closed with the belt, bringing the pouch along for good measure, then go looking for the bread.",
  beats: [
    "Nala pulls on a blue wool robe; it pools at her feet until she hitches it up and cinches the belt.",
    "The pouch hangs at her hip; the felt slippers are soft and a little big.",
    "She follows the smell of bread out past the Check-in Counter into the main hall.",
    "It leads her to an arched door on the hall's right side and down a short corridor.",
    "The corridor opens on a long, warm kitchen: hanging copper pots, a great stone oven, an oak table.",
    "On the oak table, fresh loaves are cooling, golden and still warm.",
    "There is no one here, and no sign of who baked them.",
  ],
  lore: ["place/otherwhere-kitchen", "lore/otherwhere-universe"],
  reviewedBy: ["story-reviewer/style"],
} as const satisfies StoryTurnPlayed
