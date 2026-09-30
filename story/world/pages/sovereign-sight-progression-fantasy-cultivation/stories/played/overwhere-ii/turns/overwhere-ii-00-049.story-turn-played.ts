import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIi00049 = {
  id: "01a0f433-06d1-7b5c-a54d-f9f546bfd785",
  type: "page-type/story-turn-played",
  slug: "overwhere-ii-00-049",
  ownLength: 115,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-ii"],
  position: 49,
  prose: "txt",
  characters: ["character-player/overwhere-ii-nala"],
  stepStatus: "step-status/reviewers",
  action:
    "“Share it all. I expect to take the Chartermark sooner or later anyways. No reason to slow that down.”",
  beats: [
    'Nala: "Share it all. I expect to take the Chartermark sooner or later anyways."',
    'Nala: "No reason to slow that down."',
    "Relief spreads across Anselm's tired face, and he smiles for the first time today.",
    'Anselm: "Thank you. I\'ll write it tonight, all of it, and it goes with the carrier on market day."',
    "Then a small frown creases his brow.",
    'Anselm: "You should know, though: the Charterstone in Carrowmouth gives marks only at Threllsnacht."',
    'Anselm: "That\'s nearly a year off."',
    'Anselm: "If you keep near, I\'d expect the Keepers to teach you through the year until then."',
    'Anselm: "If you go wandering far, they\'ll only have to find you first."',
  ],
  issues: [
    '"he smiles for the first time today" - he gave a small, rueful smile at the shrine in turn 44',
  ],
  lore: ["lore/overwhere-ii-keeper-anselm", "lore/overwhere-ii-nala", "lore/overwhere-ii-nala-2"],
  reviewedBy: ["story-reviewer/continuity"],
  endsAt: "2026-09-30T17:02:00.000Z",
} as const satisfies StoryTurnPlayed
