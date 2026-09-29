import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiTarano = {
  id: "01a0ea7b-36b9-785f-9526-72cf1008a501",
  type: "page-type/lore",
  slug: "otherwhere-xi-tarano",
  title: "Tarano",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-tarano",
  facts: [
    {
      fact: "Constable Tarano of Enoria led the royalists in Enoria's civil war.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tarano is dead, killed by Viv at Green Edge.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tarano had gray hair and a scar.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tarano was a sixth-step master of regency and arcane swordsmanship.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tarano ruled for the crippled First Prince Kule, and had raised Prince Lancer.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tarano set a bounty of a thousand gold on Viv.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tarano captured Viv and offered her a pardon to heal Kule and wed a spell blade.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tarano wanted Viv to bear caster children; she refused him.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tarano made his last stand at the fortress of Green Edge.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
