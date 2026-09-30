import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIii00025 = {
  id: "01a0f354-1e14-70f1-aba6-ea3a2bab4f46",
  type: "page-type/story-turn-played",
  slug: "overwhere-iii-00-025",
  ownLength: 150,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iii"],
  position: 25,
  prose: "txt",
  characters: [
    "character-player/overwhere-iii-nala",
    "character-other/overwhere-iii-brannagh-tull",
    "character-other/overwhere-iii-marda-hesk",
  ],
  stepStatus: "step-status/reviewers",
  action:
    "I take them to the shop, then see if I can find Tobin to return his coat and repay double what he spent on me, then pay for a night at the inn from my own funds.",
  beats: [
    "Nala finds the lane off the Wool Square, and a crooked green sign over a low door.",
    "Inside it's dim and low, hung with drying herbs, and smells of mint and woodsmoke.",
    "An old woman, bent and sharp-eyed, looks up from the counter. A one-eared gray cat watches too.",
    "Nala says Marda sent her, and sets out her twenty-three frostcaps.",
    "The old woman turns each one over and checks every root cut, muttering to the cat.",
    '"Clean. All of them." She counts twenty-three copper into Nala\'s hand.',
    "As Nala reaches for the coins, her sleeve rides up her forearm, over the pink seam of the bite.",
    "The old woman's hand shoots out and turns Nala's wrist to the lamp.",
    'She studies the seam, close. Then she looks up, sharp as a thorn. "Who closed this?"',
  ],
  lore: [
    "lore/overwhere-iii-bet-harrow",
    "lore/overwhere-iii-brannagh-tull",
    "lore/overwhere-iii-marda-hesk",
    "lore/overwhere-iii-nala",
    "lore/overwhere-iii-tobin-wick",
    "place/overwhere-iii-crook-and-candle",
    "place/overwhere-iii-merrowgate",
  ],
  endsAt: "2026-09-30T17:44:00.000Z",
} as const satisfies StoryTurnPlayed
