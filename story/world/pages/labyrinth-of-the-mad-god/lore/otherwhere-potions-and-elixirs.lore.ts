import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwherePotionsAndElixirs = {
  id: "01a0e9d3-bf2f-78ff-b224-11a935ff8f4a",
  type: "page-type/lore",
  slug: "otherwhere-potions-and-elixirs",
  title: "Potions, Pills and Elixirs",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Potion grades run from lesser or low-grade through basic to superior.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Basic potions come in plain glass tubes, and superior ones in shatterproof reusable vials.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Mana potions taste foul, and one can refill a large core to about three quarters.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Concentrated stamina potions come in flasks of several doses.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A black Potion of Echolocation lets its drinker sense surfaces in darkness for eight hours.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A Potion of Steelskin raises Toughness sharply for ten minutes.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A Potion of Heroism raises every physical attribute for ten minutes.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Healing magic and potions cannot purge hostile mana still at work in a body.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Species-Experience Pills are golden pearls with cloudlike patterns inside.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A body craves such a pill on touch and swallows it almost by reflex.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A pill's power spreads like a sliver of sun and is absorbed over several days.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Part of a pill's power flows into the geneline shared by the whole species.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A Baseline Attribute Enchantment Pill raises one chosen baseline attribute.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A pill's allure fades once taken, and later evolutions need far stronger means.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Liquor brewed for a higher grade and tier can burn through a lesser drinker.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Food rich in the right nutrients helps a body lock in training gains.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
