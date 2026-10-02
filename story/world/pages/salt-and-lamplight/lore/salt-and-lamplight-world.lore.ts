import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const saltAndLamplightWorld = {
  id: "01a0fd0b-91b7-7537-89d0-be46a5c21064",
  type: "page-type/lore",
  slug: "salt-and-lamplight-world",
  title: "Salt and Lamplight",
  world: "world/salt-and-lamplight",
  about: "world/salt-and-lamplight",
  facts: [
    {
      fact: "The coast is cold and northern, and the year has turned to late autumn and the first frosts.",
      knowers: ["lore-disclosure/game-master", "character-other/salt-and-lamplight-morwenna"],
    },
    {
      fact: "Light comes from oil lamps, candles and fire; there is no steam engine and no electricity.",
      knowers: ["lore-disclosure/game-master", "character-other/salt-and-lamplight-morwenna"],
    },
    {
      fact: "Magic lives in the old stories and hardly anywhere in daily life, and most folk half-believe it.",
      knowers: ["lore-disclosure/game-master", "character-other/salt-and-lamplight-morwenna"],
    },
    {
      fact: "Coin is copper pennies and silver shillings; a loaf costs a penny and a good jumper six shillings.",
      knowers: ["lore-disclosure/game-master", "character-other/salt-and-lamplight-morwenna"],
    },
    {
      fact: "Two women together are rare in Penmorrow but not unheard of, and are whispered about.",
      knowers: ["lore-disclosure/game-master", "character-other/salt-and-lamplight-morwenna"],
    },
    {
      fact: "An old coast story says the Morrow Head lamp calls home what the sea has lost.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/salt-and-lamplight-morwenna",
        "character-player/salt-and-lamplight-nala",
      ],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
