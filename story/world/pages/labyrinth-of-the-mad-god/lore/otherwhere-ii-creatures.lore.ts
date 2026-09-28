import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiCreatures = {
  id: "01a0e9a5-b2a2-71b2-ba8d-b054010e2d2b",
  type: "page-type/lore",
  slug: "otherwhere-ii-creatures",
  title: "Beasts and Monsters",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Beasts are creatures with System access: they level, train skills and grow cores.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Many beasts grow far smarter after integration, and some learn to speak and build.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Beasts have skills and traits but gain powers by instinct rather than by class.",
      knowers: ["lore-disclosure/game-master"],
    },
    { fact: "Beasts cannot use ability stones.", knowers: ["lore-disclosure/game-master"] },
    {
      fact: "Monsters are artificial or twisted lifeforms without System access.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Monsters cannot level or use abilities but can use mana and devour essence to grow.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Constructs are made things, of metal or pure mana, that can fight like living foes.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Fallen creatures are beasts corrupted by Taltos's pantheon into mutated killers.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A slain beast's body can be eaten, skinned and used like any animal's.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
