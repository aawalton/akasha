import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const hollowmereMorwenna = {
  id: "01a0fe96-b8a6-7399-8126-9f8958bff9d4",
  type: "page-type/lore",
  slug: "hollowmere-morwenna",
  title: "Morwenna",
  world: "world/hollowmere",
  about: "character-other/hollowmere-morwenna",
  facts: [
    {
      fact: "Morwenna Hale is twenty-two, a third-year, and captain of the Hollowmere rowing club.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/hollowmere-morwenna",
        "character-other/hollowmere-bea",
      ],
    },
    {
      fact: "Morwenna is tall, slim and long-limbed, with lean strong arms, narrow hips and a small flat chest.",
      knowers: ["lore-disclosure/game-master", "character-other/hollowmere-morwenna"],
    },
    {
      fact: "Morwenna has fair wind-flushed skin, sharp grey eyes, straight dark brows and a wide grin.",
      knowers: ["lore-disclosure/game-master", "character-other/hollowmere-morwenna"],
    },
    {
      fact: "Morwenna wears her dark brown hair in a short ponytail under a navy wool headband.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/hollowmere-morwenna",
        "character-player/hollowmere-nala",
        "character-other/hollowmere-bea",
      ],
    },
    {
      fact: "Morwenna coaches from a launch with a megaphone, in a sleeveless navy club fleece.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/hollowmere-morwenna",
        "character-player/hollowmere-nala",
        "character-other/hollowmere-bea",
      ],
    },
    {
      fact: "Morwenna is loud, cheerful and exacting, and remembers every novice's name by the second week.",
      knowers: ["lore-disclosure/game-master", "character-other/hollowmere-morwenna"],
    },
    {
      fact: "Morwenna is from Falmouth, and grew up rowing gigs on the Cornish sea.",
      knowers: ["lore-disclosure/game-master", "character-other/hollowmere-morwenna"],
    },
    {
      fact: "Morwenna studies weather-working, and means to be licensed for it.",
      knowers: ["lore-disclosure/game-master", "character-other/hollowmere-morwenna"],
    },
    {
      fact: "Morwenna says Ashcombe always fades at the bend by the reeds; she told Bea: stroke rate up there.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/hollowmere-nala",
        "character-other/hollowmere-bea",
        "character-other/hollowmere-morwenna",
      ],
    },
  ],
} as const satisfies Lore
