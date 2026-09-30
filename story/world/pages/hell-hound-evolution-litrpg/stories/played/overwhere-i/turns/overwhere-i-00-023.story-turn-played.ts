import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00023 = {
  id: "01a0f215-976a-71ac-9b5d-11384c99b2b4",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-023",
  ownLength: 105,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 23,
  prose: "txt",
  characters: ["character-player/overwhere-i-nala"],
  stepStatus: "step-status/recorders",
  action:
    "I make the water blade again and use it to just cut off the tusks, focusing on making it spin even faster and thinner.",
  beats: [
    "Nala sits back on her heels and calls up the water disc again above her palm.",
    "This time she wills it thinner and faster, until it is a hissing blur she can barely see.",
    "She sets it where the first tusk springs from the jaw. It sinks in almost without a sound.",
    "In moments the tusk drops into the leaf mould. She turns the head and takes the second.",
    "Well inside a minute she lets the water fall; the disc spatters across the leaves.",
    "Both tusks lie in the leaf mould beside her, yellow and curved, each as long as her forearm.",
  ],
  lore: [
    "lore/overwhere-i-agathe-morrow",
    "lore/overwhere-i-greyfen-beasts",
    "lore/overwhere-i-nala",
    "lore/overwhere-i-starfall-legacy",
    "place/overwhere-i-fenwatch",
  ],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: ["story-recorder/inventory", "story-recorder/memory"],
  endsAt: "2026-09-30T07:59:00.000Z",
} as const satisfies StoryTurnPlayed
