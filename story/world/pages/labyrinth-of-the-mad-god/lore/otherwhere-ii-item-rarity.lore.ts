import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiItemRarity = {
  id: "01a0e9d0-bfd7-76b8-85ab-f3bd5c0985e0",
  type: "page-type/lore",
  slug: "otherwhere-ii-item-rarity",
  title: "Item Rarity",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "The item rarity ladder runs Basic, Common, Uncommon, Rare, Epic, Legendary, Mythic and Supreme.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Unique marks a one-of-a-kind item or building outside the ordinary ladder.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Basic items are plain goods without magic, such as a hemp shirt, a canteen or a spyglass.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Common items are sturdier but seldom repair themselves.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Uncommon items usually carry one to three modifications, like durability or self-maintenance.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Uncommon-plus marks buildings that are magical but not strong enough to count as Rare.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Rare items carry several modifications or a strong unique power.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Epic items often hold a personality and a rudimentary intelligence.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Legendary items are artifacts of world-shaping history, rare even among great civilizations.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Unique artifacts may show a current power and a greater maximum power they can grow into.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "An item's rarity can rise when crafters work better materials into it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Material grades exist too, and an SS-grade diamond can buy a solar system.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A basic, non-magical blade is nearly worthless to a seasoned contestant.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A basic or common weapon is damaged when it meets a far rarer blade edge to edge.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
