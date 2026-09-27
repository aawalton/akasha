import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00029 = {
  id: "01a0e511-1ed3-7fe9-9c3f-7593c5a77a1f",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-029",
  ownLength: 109,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 29,
  prose: "txt",
  characters: [
    "character-player/otherwhere-alan",
    "character-other/otherwhere-links",
    "character-other/otherwhere-engorged-bookworm-03",
    "character-other/otherwhere-engorged-bookworm-04",
    "character-other/otherwhere-engorged-bookworm-05",
  ],
  turnStatus: "turn-status/recorders",
  action:
    "I pick up handfuls of salt again and bait out a lunge, then grab it by the neck and tackle it into the salt",
  beats: [
    "Nala scoops two fistfuls of salt from the heap and steps toward the coiled bookworm, arm held out.",
    "It takes the bait and lunges at her outstretched arm; she whips it back and the teeth close on air.",
    "Before it can draw back she clamps both salted fists round its neck behind the mouth.",
    "Its skin puckers dry under her grip, and she throws her weight forward and drives it into the heap.",
    "Salt sprays up round it; it shrieks and bucks, shrinking and greying fast.",
    "She lies across it, fists locked, as the thrashing weakens under her.",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
} as const satisfies StoryTurnPlayed
