import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiTarana = {
  id: "01a0ea7c-200f-7b5c-a453-cb1771022fa0",
  type: "page-type/lore",
  slug: "otherwhere-xi-tarana",
  title: "Tarana",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-tarana",
  facts: [
    {
      fact: "Tarana is a Hallurian huntress, sister of the archmage Rakan.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tarana has a tattooed arm.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tarana rescued her brother Rakan from Halluria.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tarana was found near death in Helock's temple of Enttiku during the riots.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The archmage Tod of Helock's medical faculty saved Tarana's life.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tarana settled in Kazar and is fascinated by the hadals.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Tarana lives in New Harrak near her brother.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
