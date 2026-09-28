import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIxFailedSummon = {
  id: "01a0ea38-6575-7f51-a4d4-de700d371555",
  type: "page-type/lore",
  slug: "otherwhere-ix-failed-summon",
  title: "Failed summon",
  world: "world/mana-devourer-litrpgmana-cultivation",
  about: "world-species/otherwhere-ix-failed-summon",
  facts: [
    {
      fact: "The lower levels beneath the Sun City arena teem with twisted, questionable monsters.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Arena workers call that dark a dumping ground for the arena master's failures.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The caves once served as a gladiator training ground, stocked with rewards for the bold.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its bats and bear-creatures are native animals; much of the rest is tainted or unnatural.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Such monsters yield cores like any beast, and their kills give levels like any other.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Like other cave monsters they shun torchlight unless noise draws them close.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
