import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const fairweatherMoney = {
  id: "01a102af-305c-70d4-adbe-417d08619eaa",
  type: "page-type/world-mechanic",
  slug: "fairweather-money",
  title: "Money",
  world: "world/fairweather",
  description:
    "Money in Lanternmere is the world-currency fairweather-coin: copper pips, silver lanterns and gold suns, ten pips to a lantern and twenty lanterns to a sun. A character's money is a purse of it, counted in pips. Prices: a loaf one pip, a pot of tea two pips, a tavern supper four pips, a sack of flour three pips, an attic room one lantern a week, registering with the Adventurers' Guild two lanterns, a roll of bandages two pips, a dungeon licence for a party one lantern. An F-rank quest pays three to eight lanterns to the party that finishes it, and the party splits it as it agrees. Every pip Elsie or another party member spends or earns is told in the prose, and each one's purse is set to what she ends the chapter with. The prose names coins as coins in a hand and never as a total on a page.",
} as const satisfies WorldMechanic
