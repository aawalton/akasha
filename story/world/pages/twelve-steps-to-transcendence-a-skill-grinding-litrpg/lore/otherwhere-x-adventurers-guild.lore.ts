import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXAdventurersGuild = {
  id: "01a0ea78-4904-7c21-b6c0-c14aa07a3f56",
  type: "page-type/lore",
  slug: "otherwhere-x-adventurers-guild",
  title: "The Adventurer's Guild",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  about: "world-organization/otherwhere-x-adventurers-guild",
  facts: [
    {
      fact: "The Adventurer's Guild exists in the Central Plains and deals with rifts among other things.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sulon's soldiers expect the Guild to get involved when a new rift appears.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Becoming an adventurer is a known path in life, beside joining an academy.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
