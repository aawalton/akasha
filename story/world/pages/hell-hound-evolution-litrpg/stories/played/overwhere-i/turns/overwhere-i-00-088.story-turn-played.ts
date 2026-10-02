import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00088 = {
  id: "01a0fe74-93da-7ac6-b373-9e93f1c926ec",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-088",
  ownLength: 152,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 88,
  prose: "txt",
  characters: ["character-player/overwhere-i-nala"],
  stepStatus: "step-status/recorders",
  action:
    "I start tracking the mile and cart, keeping my mana around 80% full and using my mobility enhancements wherever it is higher.",
  beats: [
    "By the light of her palm flame, Nala follows the mule's prints and the cart's ruts east.",
    "While her well sits high she runs the stride in short bursts, then walks as it settles lower.",
    "At a passing place the ruts tangle with older tracks, and she casts about a while to find them.",
    "She picks them up again past the passing place and goes on east through the oaks.",
    "About three miles from the quarry, a little after midnight, a glow of embers shows ahead.",
    "It is a roadside well with a stone lip, and beside it stands Osric's mule cart, the mule hobbled.",
    "As her flame comes on toward the cart, a bowstring creaks in the dark beside it.",
    '"Who\'s there? Stand and say, or I loose!" Tobin calls, his voice high and shaking.',
  ],
  lore: [
    "lore/overwhere-i-nala",
    "lore/overwhere-i-nala-2",
    "lore/overwhere-i-osric-fenn",
    "lore/overwhere-i-tobin-ashdown",
    "place/overwhere-i-greyback-and-east-road",
  ],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: ["story-recorder/inventory", "story-recorder/memory", "story-recorder/mechanics"],
  endsAt: "2026-10-04T00:28:00.000Z",
} as const satisfies StoryTurnPlayed
