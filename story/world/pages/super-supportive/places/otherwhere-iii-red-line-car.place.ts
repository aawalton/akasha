import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereIiiRedLineCar = {
  id: "01a0e9ef-b013-7f17-97b0-61bf1c6850eb",
  type: "page-type/place",
  slug: "otherwhere-iii-red-line-car",
  title: "A Howard-Bound Red Line Car",
  world: "world/super-supportive",
  facts: [
    {
      fact: "The Howard train is a run of long steel cars with plastic seats, bright lights and heat blowing low.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The doors chime and slide shut some fifteen seconds after they open.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A recorded voice names each stop: Addison, Sheridan, Wilson, and on north to Howard.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Howard is the end of the line, some twenty-five minutes north; every rider must get off there.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "No one checks fares aboard; a rider already past the turnstiles rides free.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "At five on a Saturday morning a car holds a few riders: a man asleep, a nurse in scrubs, a student.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A screen by the doors runs ads and news: the hero Skiff chased an earth-shaper under Lake Michigan.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The heat in the car makes numb feet burn and prickle as feeling comes back.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Riders glance at a barefoot woman in a sleep shirt and mostly look away.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The nurse is kind but tired, and would ask a shoeless woman if she needs help.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  within: "place/otherwhere-iii-chicago",
} as const satisfies Place
