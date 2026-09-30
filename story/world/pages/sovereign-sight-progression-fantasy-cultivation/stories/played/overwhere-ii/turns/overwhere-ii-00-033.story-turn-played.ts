import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIi00033 = {
  id: "01a0f383-25d6-7ccd-bf29-c412544b1408",
  type: "page-type/story-turn-played",
  slug: "overwhere-ii-00-033",
  ownLength: 213,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-ii"],
  position: 33,
  prose: "txt",
  characters: ["character-player/overwhere-ii-nala"],
  stepStatus: "step-status/recorders",
  action:
    "“Up by Garth’s place. You’ll need to send a cart for the carcasses. I got the alpha and thinned the pack, but a few of them got away.”",
  beats: [
    "Nala: \"Up by Garth's place. You'll need to send a cart for the carcasses.\"",
    'Nala: "I got the alpha and thinned the pack, but a few of them got away."',
    "Behind the Reeve, Col Ashby limps into the passage on a stick, his leg bound knee to ankle.",
    'Col: "If she says she did it, Reeve, she did it. She pulled the rot out of me clean."',
    "Dray grunts and bellows over his shoulder for the Cray brothers and the watch cart.",
    "Reeve Dray: \"Four carcasses at Marsh Croft, and Garth Marsh's word. That'll do me for proof.\"",
    "Reeve Dray: \"Two silver a head, once the cart's back. They'll be back by noon.\"",
    'Reeve Dray: "And the watch swore a silver bar from its own chest for the white-eye. You\'ll have it."',
    "He hands the cracked chamber back to her, gently, as if it might break further.",
    'Reeve Dray: "A few left, you say. Without her they\'ll scatter up the fells and pick off lambs."',
    'Reeve Dray: "Lambing\'s three weeks off. I want them dead before it."',
    'Reeve Dray: "My watch can\'t catch them. Would you lead the hunt, for pay?"',
  ],
  lore: [
    "lore/overwhere-ii-nala",
    "lore/overwhere-ii-reeve-corwin-dray",
    "lore/overwhere-ii-wendle-ford-folk",
  ],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: ["story-recorder/inventory"],
  endsAt: "2026-09-30T08:15:00.000Z",
} as const satisfies StoryTurnPlayed
