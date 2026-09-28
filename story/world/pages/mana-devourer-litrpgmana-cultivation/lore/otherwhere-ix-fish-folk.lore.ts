import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIxFishFolk = {
  id: "01a0ea34-d6f4-77a5-a779-8601beb31d53",
  type: "page-type/lore",
  slug: "otherwhere-ix-fish-folk",
  title: "Fish-folk",
  world: "world/mana-devourer-litrpgmana-cultivation",
  about: "world-species/otherwhere-ix-fish-folk",
  facts: [
    {
      fact: "Fish-folk are huge, bipedal people with the heads and scaled bodies of fish.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Fish-folk speak the common tongue and live and work among the other peoples of Firrelia.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Fish-folk serve as guards in the cell blocks beneath the Sun City arena, armed with nightsticks.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Fish-folk guards bang the cell bars on their rounds and laugh off prisoners' talk of escape.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Fish-folk guards treat summoned prisoners as the arena's property, not as people to fear.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
