import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereViSystem = {
  id: "01a0ea24-b033-78bb-9eea-57e13e647114",
  type: "page-type/lore",
  slug: "otherwhere-vi-system",
  title: "The System",
  world: "world/wolf-girl-evolution-tails-teeth-and-too-much-food",
  about: "world/wolf-girl-evolution-tails-teeth-and-too-much-food",
  facts: [
    {
      fact: "Every living thing has a status, which opens when its owner wills it or thinks Status.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A status lists Name, Level, Race and Tier, Gender, HP, SP, MP, stats, skills and traits.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The seven stats are Strength, Dexterity, Vitality, Intelligence, Willpower, Charisma, Luck.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The System answers to Status alone; it has no menu, inventory or character sheet.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A status shows its letters faintly before the owner's eyes, and no one else sees them.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The System speaks in bracketed lines, as 【Level Up: 1 → 2】, for gains, warnings and unlocks.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The System often adds a dry, mocking remark after a feat, a folly or a near death.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A level shows as current over the cap of its tier, as Level: 1/10.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "SP is stamina, spent by running, fighting and skills; MP is mana, spent by magic.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A person's Class, as a beast's Race, sets how the System shapes that one's growth.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Others read a status only by skills such as Identify or Inspect.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
