import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIvBrooksideFour = {
  id: "01a0ed2e-0f6c-7f00-ab6f-6011bb59154c",
  type: "page-type/lore",
  slug: "overwhere-iv-brookside-four",
  title: "The Brookside Four",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  facts: [
    {
      fact: "The Brookside Four are an adventurer party of bronze rank.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Dace is their warrior, proud, and LV 19.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Wren is their scout, quiet and watchful.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Merrit is their fire mage, and he is jealous of any better caster.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Orla is their healer, and she is gentle.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "They take most of the wolf, boar and goblin work posted at the hall.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
