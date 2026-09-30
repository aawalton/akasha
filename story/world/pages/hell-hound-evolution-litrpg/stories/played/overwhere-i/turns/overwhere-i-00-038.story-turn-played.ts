import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00038 = {
  id: "01a0f39f-587d-7edf-8538-539734c5d512",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-038",
  ownLength: 143,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 38,
  prose: "txt",
  characters: ["character-player/overwhere-i-nala"],
  stepStatus: "step-status/reviewers",
  action:
    "I start a spiral search pattern using my water and earth detection technique, searching for the third hole.",
  beats: [
    "Nala binds earth and water and sends a gentle ripple out from where she stands.",
    "Past fifty yards it blurs, as before. Nothing warm and heavy inside that.",
    "She walks on up the channel, fifteen yards, and sends another, sweeping wider.",
    "This time, near the edge of its reach, it finds something.",
    "Under a big alder on the bank, a hundred yards up from the first slide, lies a warm, heavy weight.",
    "It is longer and denser than the other two. It lies loose and slow. It is asleep.",
    "Around the den the wet earth is laced with something hard and knotted, like a net: roots.",
    "The alder's roots wrap the den on every side. The only open way is the tunnel down to the water.",
  ],
  issues: ['"it finds no warm, heavy weight" - Plain Negation'],
  lore: ["lore/overwhere-i-greyfen-beasts-2", "lore/overwhere-i-nala"],
  reviewedBy: ["story-reviewer/style"],
  endsAt: "2026-09-30T11:06:00.000Z",
} as const satisfies StoryTurnPlayed
