import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIxWorldTournaments = {
  id: "01a0ea39-fe76-7734-a2fd-f063c8e6e2ce",
  type: "page-type/lore",
  slug: "otherwhere-ix-world-tournaments",
  title: "The World Tournaments",
  world: "world/mana-devourer-litrpgmana-cultivation",
  about: "world-mechanic/otherwhere-ix-world-tournaments",
  facts: [
    {
      fact: "Cosmic tournaments decide the rankings of the eleven worlds and their value on the cosmic scale.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Gods do not fight in the tournaments themselves; their Champions fight for them.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A god whose Champion is lost is wounded in spirit.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Firrelia has had the worst showing in the tournaments for centuries.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Firrelia's gods keep it losing by design, so it never advances and they rule it unopposed.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
