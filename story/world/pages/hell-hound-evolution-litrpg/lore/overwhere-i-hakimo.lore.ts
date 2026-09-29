import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIHakimo = {
  id: "01a0ed23-312a-7286-9a91-893e52c5ead2",
  type: "page-type/lore",
  slug: "overwhere-i-hakimo",
  title: "General Hakimo",
  world: "world/hell-hound-evolution-litrpg",
  facts: [
    {
      fact: "General Hakimo is a general of the Verdant Empire.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He has a scar over his left eye and wears ornate military dress like Rin Zaoh's.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He is courteous, patient and methodical, and carries a binder and a pen.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He praises Grick's unconventional approach to warfare.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He questioned the captive spy Sakura Aoyama for Rin Zaoh.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He is in the Verdant capital now, with Rin, hearing Grick's report.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
