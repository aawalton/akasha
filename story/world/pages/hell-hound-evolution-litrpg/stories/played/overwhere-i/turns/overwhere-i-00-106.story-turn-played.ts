import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00106 = {
  id: "01a0ff7f-4529-7530-841d-f4f91253eabb",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-106",
  ownLength: 377,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 106,
  prose: "txt",
  characters: ["character-player/overwhere-i-nala"],
  stepStatus: "step-status/reviewers",
  action:
    "“Great! I’ll be back.” Then I go to the other two stores to sell the sword, crossbow, and grubboar tusks.",
  beats: [
    '"Great! I\'ll be back," Nala tells Ilse, and walks five minutes to Anvil Lane.',
    "Wil Harrow's forge fronts the lane: a broad, bald smith with a burn-scarred forearm.",
    "Nala lays Voss's arming sword and Crow's crossbow across his bench.",
    'Wil works the crossbow\'s crank and runs a thumb along the lath. "City work, this. I want it."',
    "He turns the sword, finds the levy stamp, glances at Nala's antler badge, and lets the question lie.",
    '"Three gold six for the bow. Two gold two for the blade." He counts it out on the bench.',
    "\"Plain soldier's short swords I take too, sixty copper apiece, if you've any about you.\"",
    "Nala walks ten minutes down to the river stairs and a steamy cellar at their foot.",
    "Mother Sallow is stooped and old, a clay pipe in her teeth among the bubbling pots.",
    'She snatches up the grubboar tusks. "Old ones grind finest." She pays two silver four.',
    'She taps her pipe at Nala\'s badge. "You after the Weir Wyrm, hunter?"',
    '"Bring me its bile sac within a day of the kill, and I\'ll pay two gold for it."',
  ],
  lore: ["lore/overwhere-i-nala", "lore/overwhere-i-nala-2", "lore/overwhere-i-wendlow-2"],
  reviewedBy: ["story-reviewer/style"],
  endsAt: "2026-10-05T13:45:00.000Z",
} as const satisfies StoryTurnPlayed
