import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVBlightmind = {
  id: "01a0e9fc-aa24-79c8-b15c-d7b35b5601d1",
  type: "page-type/lore",
  slug: "otherwhere-v-blightmind",
  title: "Blightmind",
  world: "world/ends-of-magic",
  about: "world-species/otherwhere-v-blightmind",
  facts: [
    {
      fact: 'A blightmind is a mile-wide mass of death mana; Questors just call it "the blight".',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A blightmind is made of thousands of gigantic death elementals joined as one mind.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A blightmind's tendrils share thought through mana that passes when they touch.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A blightmind sits atop a corrupted Seal and is fed by it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A blightmind attacks with fear, wizardry and twists of reality.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A blightmind can raise black dust storms to block out light.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Once its blightmind dies, a blight's monsters lose coordination and stand idle.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
