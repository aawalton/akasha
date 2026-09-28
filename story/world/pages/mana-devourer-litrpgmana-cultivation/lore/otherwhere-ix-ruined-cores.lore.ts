import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIxRuinedCores = {
  id: "01a0ea42-4492-7b54-a196-250d4557278b",
  type: "page-type/lore",
  slug: "otherwhere-ix-ruined-cores",
  title: "Ruined Cores",
  world: "world/mana-devourer-litrpgmana-cultivation",
  about: "world-mechanic/otherwhere-ix-ruined-cores",
  facts: [
    {
      fact: "The system marks some combined cores 'Ruined', as a 'D Grade Ruined Cavedweller Core'.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A core comes out ruined when a giant's core is among its parts.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Giants of the dark halls below Sun City's arena are no natural beasts, and their cores show it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A giant's core feels wrong to its holder, a heavy weight unlike any beast's.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A ruined core still gives stats: each gave +3 to all stats on forming.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Three ruined cores combine into an Eternal core, 'Unawakened', giving +5 to all stats.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Joining ruined cores hurts badly; Mystic mana poured in eases it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Eternal core gives Guardian, a gift from the giants: strength in holding ground by allies.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Some underground beasts are failed summons, and using their cores troubles a decent conscience.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
