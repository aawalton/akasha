import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIvWaShi = {
  id: "01a0ea11-6ea5-77b4-ae23-dc0eb83962a8",
  type: "page-type/lore",
  slug: "otherwhere-iv-wa-shi",
  title: "Wa Shi (Washy)",
  world: "world/beware-of-chicken",
  facts: [
    {
      fact: "Wa Shi, called Washy, is a young water-and-lightning Spirit Beast of Fa Ram.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Washy can shrink to a small, ordinary-looking fish form.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "To outsiders Washy seems an ordinary talking fish kept in a jar.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This late spring Washy travels south with Jin's family toward the Ironfields and Pale Moon Lake.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Washy is openly a coward and fears hawks, yet reliably obeys orders to retreat and protect.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "When his home was threatened Washy chose to fight rather than flee.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
