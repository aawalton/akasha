import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const emberdeepMoney = {
  id: "01a0fde6-9f8a-7d2a-bf74-9d357d5762b9",
  type: "page-type/world-mechanic",
  slug: "emberdeep-money",
  title: "Money",
  world: "world/emberdeep",
  description:
    "Money in Emberdeep is the world-currency emberdeep-coin: copper pennies, silver marks and gold crowns, twelve pennies to a mark and twenty marks to a crown. A character's money is a purse of it, counted in pennies. Prices: a tavern supper with small beer four pennies, a loaf one penny, a candle one penny, the guild's first-level map two pennies, a room two marks a week, registering as a delver one silver mark, a good tin lamp a mark, fifty feet of rope three marks, a single ember-stone four pennies. Finds sold at the finds market and the guild's share of them are what pay a delver. Counting coin is part of the story: every penny Nala spends or earns is told in the prose, and her purse is set to what she ends the chapter with. The prose names coins as coins in her hand and never as a total on a page.",
} as const satisfies WorldMechanic
