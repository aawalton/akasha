import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theFirstBuried = {
  id: "01a0ddff-b8bd-72ca-bc39-bf99734c7f32",
  type: "page-type/lore",
  slug: "the-first-buried",
  title: "The First Buried",
  world: "world/cornerstone",
  about: "world-character/cornerstone-the-first-buried",
  facts: [
    {
      fact: "The First Buried is the first settler to die at the founding camp.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "On the second or third day, the camp gathered in a weighted stillness.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The camp lowered the body by degrees into a long narrow grave near the center, off to one side.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "At night the living lie their weight on the soil, and it breathes, an endless faint tide.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The buried body's weight had no breath; it was the first wholly still thing the core had held.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The buried body became a mirror pressed against the core.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The body turned over a recognition in the core: it too is a thing laid down into the dark.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The core, too, is a weight beneath the weight, still and held and bodiless.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The dead settler links to the core's own buried past-life death.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
