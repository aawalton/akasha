import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00115 = {
  id: "01a101da-fa5d-783b-8116-b529d8836500",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-115",
  ownLength: 374,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 115,
  prose: "txt",
  characters: ["character-player/overwhere-i-nala"],
  stepStatus: "step-status/reviewers",
  action:
    "I spend the afternoon testing weaves to see if I can get something to repair the tears in my clothes.",
  beats: [
    "Nala finds a quiet spot and lays out her wool tunic: a bolt-torn rent at the ribs, a slit sleeve.",
    "Her cloak hem hangs ragged too.",
    "She starts with the pairs she knows. Fire scorches a brown edge onto the rent; she snuffs it fast.",
    "Air frays the threads looser. Water alone only soaks the cloth.",
    "She tries pair after pair through the warm afternoon, and the tunic takes each one badly.",
    "Earth with water, last: the wool fibres creep together and lock.",
    "The rent at the ribs felts shut in a stiff, ridged seam, a hand-span long, in about five minutes.",
    "She works the slit sleeve the same way; another ridge, stiff but whole.",
    "The tunic pulls on stiff where the seams run, but it holds.",
    "Late sun slants across Wendlow. Nala's throat is dry; supper smoke drifts from the Bell and Barrel.",
  ],
  issues: [
    '"edges frayed and stiff with old blood" - she steam-cleaned her clothes earlier on day 8',
  ],
  lore: [
    "lore/overwhere-i-nala",
    "lore/overwhere-i-nala-2",
    "lore/overwhere-i-starfall-legacy",
    "lore/overwhere-i-starfall-legacy-2",
    "lore/overwhere-i-starfall-legacy-2-2",
    "lore/overwhere-i-wendlow-2",
    "lore/overwhere-i-wendlow-2-2",
  ],
  reviewedBy: ["story-reviewer/continuity"],
  endsAt: "2026-10-06T17:57:00.000Z",
} as const satisfies StoryTurnPlayed
