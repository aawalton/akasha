import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIi00106 = {
  id: "01a10199-34b9-7cde-af09-f39c06bf9148",
  type: "page-type/story-turn-played",
  slug: "overwhere-ii-00-106",
  ownLength: 132,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-ii"],
  position: 106,
  prose: "txt",
  characters: ["character-player/overwhere-ii-nala"],
  stepStatus: "step-status/recorders",
  action:
    "I empty out my leather pouch into another bag and pull the bead into the pouch, to see if it will hold it.",
  beats: [
    "Nala tips her coin out of the leather pouch into her other bag.",
    "She holds the empty pouch open by the bead and draws it in with a thread of her tide.",
    "The bead slides over the lip and drops inside, heavy for its size.",
    "She lets go of it and pulls the drawstring tight.",
    "For a few breaths, the pouch is still.",
    "Then a dark spot blooms on the leather's outside, and spreads.",
    "The bead seeps out through the leather and gathers again on the outside, glistening.",
    "Where it came through, the leather is stained grey and stiff with salt.",
    "The bead drops from the pouch onto the stone, and begins to crawl toward the pool again.",
    'Hawise watches it from her boulder, frowning. "Leather won\'t do it, then."',
  ],
  lore: [
    "lore/overwhere-ii-nala",
    "lore/overwhere-ii-nala-2",
    "lore/overwhere-ii-nala-3",
    "place/overwhere-ii-whitecombs",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/inventory", "story-recorder/mechanics"],
  endsAt: "2026-10-26T11:23:00.000Z",
} as const satisfies StoryTurnPlayed
