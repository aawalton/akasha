import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIiiHorace = {
  id: "01a0ed2f-3744-7d99-bc7f-b8d2a973543e",
  type: "page-type/lore",
  slug: "overwhere-iii-horace",
  title: "Headmaster Horace",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  about: "character-other/overwhere-iii-horace",
  facts: [
    {
      fact: "Headmaster Horace rules Forestwind Mage Academy, hidden in forested hills near Abylport.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He is an elderly, powerful mage who fights with a staff.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He flies faster than Liora, teleports, and fires beams of energy.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He favors the Path of Mystic Prism and scorns Lost Magic.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He deferred to the Stolte name when Damien Stolte brought Serena Rembrack.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Forestwind has marble houses, brick streets with street lights, and night guards in shifts.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its grand hall has stained glass of mages fighting monsters, and hides a wind mana node.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
