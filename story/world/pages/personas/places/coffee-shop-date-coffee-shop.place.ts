import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const coffeeShopDateCoffeeShop = {
  id: "01a0682a-d9b6-740b-aafd-f024df0bfe74",
  type: "page-type/place",
  slug: "coffee-shop-date-coffee-shop",
  title: "Coffee Shop",
  world: "world/personas",
  facts: [
    {
      fact: "The coffee shop is a small third-wave café on a corner, made for lingering.",
      knowers: ["lore-disclosure/game-master", "character-player/coffee-shop-date-alan"],
    },
    {
      fact: "The coffee shop has mismatched wooden tables, worn armchairs in the back and exposed brick.",
      knowers: ["lore-disclosure/game-master", "character-player/coffee-shop-date-alan"],
    },
    {
      fact: "The coffee shop's menu is written on a chalkboard.",
      knowers: ["lore-disclosure/game-master", "character-player/coffee-shop-date-alan"],
    },
    {
      fact: "The coffee shop smells of espresso and steamed milk.",
      knowers: ["lore-disclosure/game-master", "character-player/coffee-shop-date-alan"],
    },
    {
      fact: "Big front windows look out of the coffee shop onto the street.",
      knowers: ["lore-disclosure/game-master", "character-player/coffee-shop-date-alan"],
    },
    {
      fact: "Afternoons in the coffee shop run quiet between rushes.",
      knowers: ["lore-disclosure/game-master", "character-player/coffee-shop-date-alan"],
    },
    {
      fact: "The coffee shop is warm and hushed, with a low hum of talk and soft indie folk playing.",
      knowers: ["lore-disclosure/game-master", "character-player/coffee-shop-date-alan"],
    },
    {
      fact: "The coffee shop lowers voices and slows people down.",
      knowers: ["lore-disclosure/game-master", "character-player/coffee-shop-date-alan"],
    },
    {
      fact: "On a rainy afternoon the coffee shop feels like shelter from the world outside.",
      knowers: ["lore-disclosure/game-master", "character-player/coffee-shop-date-alan"],
    },
    {
      fact: "The espresso machine hisses, a barista calls names, and a bell rings over the door.",
      knowers: ["lore-disclosure/game-master", "character-player/coffee-shop-date-alan"],
    },
  ],
  turnStates: "jsonl",
} as const satisfies Place
