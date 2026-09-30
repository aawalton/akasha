import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00040 = {
  id: "01a0f3b3-4f7e-7520-9229-8c5255f332cd",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-040",
  ownLength: 121,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 40,
  prose: "txt",
  characters: ["character-player/overwhere-i-nala"],
  stepStatus: "step-status/recorders",
  action:
    "I attune water and pull the beast through its entrance hole, into the water, and then back onto the shore. “Three renders accounted for.”",
  beats: [
    "Nala reaches for water and wills it into the flooded tunnel, closing round the heavy weight within.",
    "It comes easily. She draws it down the tunnel and out through the mouth into the channel.",
    "The water bulges, and she heaves the body up and swings it onto the bank.",
    "It lands with a wet thump by Jory: half again the size of the others, scalded pink in patches.",
    'She lets the water go. "Three lurkers accounted for," she says.',
    "Jory whoops, loud enough to send birds up out of the reeds.",
    '"Three! All three, and not a scratch on you." He claps his hands. "I\'ll tell the reeve myself."',
    '"And you\'ll have a string of my smoked eels for it, and welcome."',
  ],
  lore: [
    "lore/overwhere-i-greyfen-beasts-2",
    "lore/overwhere-i-nala",
    "lore/overwhere-i-nala-2",
    "lore/overwhere-i-starfall-legacy",
    "place/overwhere-i-the-greyfen",
  ],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  endsAt: "2026-09-30T11:12:00.000Z",
} as const satisfies StoryTurnPlayed
