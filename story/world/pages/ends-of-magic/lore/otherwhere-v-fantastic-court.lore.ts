import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVFantasticCourt = {
  id: "01a0e9ff-dc72-7b67-9b8b-482abe7f881d",
  type: "page-type/lore",
  slug: "otherwhere-v-fantastic-court",
  title: "The Fantastic Court",
  world: "world/ends-of-magic",
  about: "world-organization/otherwhere-v-fantastic-court",
  facts: [
    {
      fact: "The Fantastic Court is a group of Questors, thought to be linked to the Aleph grid.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
