import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00025 = {
  id: "01a0f24e-f3ef-769a-b6de-659c9856e093",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-025",
  ownLength: 192,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 25,
  prose: "txt",
  characters: ["character-player/overwhere-i-nala"],
  stepStatus: "step-status/recorders",
  action:
    "“You’re welcome to the hide and meat for free if you can find it. I killed him in the swamp and he sank in deep. Barely managed to get the tusks out of the muck. If you manage it, it’s yours. I’m taking a bath!”",
  beats: [
    "Nala tells the reeve the hide and meat are hers for free, if the village can get them out.",
    "She says she killed him in the swamp, he sank in deep, and she barely got the tusks out of the muck.",
    "Agathe looks at her for a long moment, then smiles, and the smile reaches her eyes.",
    '"That\'s a gift worth having," she says. "Meat for half the village, and a hide for the purse."',
    '"We\'ll have him out. Ropes, a mule and four men." She is already reaching for her staff.',
    'Garrick laughs, a laugh that shakes the rafters. "A bath, then. I\'ll heat the water."',
    "Nala counts two copper into his hand.",
    "In the back room the wooden tub steams. She peels off her mud-stiff clothes and sinks in.",
    "The water goes brown around her. Mud and boar's blood lift from her arms and out of her hair.",
    "She soaks until the water cools, the tightness going out of her shoulders.",
    "She climbs out clean. Her clothes lie on the floor in a heap, stiff with mud and blood.",
  ],
  lore: [
    "lore/overwhere-i-agathe-morrow",
    "lore/overwhere-i-garrick-pell",
    "lore/overwhere-i-nala",
    "place/overwhere-i-fenwatch",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/memory", "story-recorder/inventory"],
  endsAt: "2026-09-30T09:09:00.000Z",
} as const satisfies StoryTurnPlayed
