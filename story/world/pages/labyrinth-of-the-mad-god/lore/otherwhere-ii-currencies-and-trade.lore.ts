import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiCurrenciesAndTrade = {
  id: "01a0e9d3-bf2e-7a43-b5c1-5fa194ff590b",
  type: "page-type/lore",
  slug: "otherwhere-ii-currencies-and-trade",
  title: "Currencies and Trade",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Velen trades by barter and uses a single coin counted in base ten.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Pirate hoards hold gems and golden coins as hard currency.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tutorial knowledge points buy codex entries and custom questions.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Labyrinth Knowledge Points unlock a codex on Taltos and the Labyrinth.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "City Points, also called Building Points, buy buildings and fixtures for a settlement.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Contribution Tokens let a settlement reward residents, with the System tracking every payment.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A settlement leader can mint as many Contribution Tokens as needed.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Without an official exchange, a leader must approve each token trade by hand.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "An official exchange building lets the System keep token records and transfers.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Barter remains common wherever no currency exists.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A person's gear is their lifeline, so gifting an item is a serious gesture.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
