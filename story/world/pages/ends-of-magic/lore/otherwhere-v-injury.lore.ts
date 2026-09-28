import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVInjury = {
  id: "01a0ea0d-4e6d-7fc1-93dd-dd0056c4c220",
  type: "page-type/lore",
  slug: "otherwhere-v-injury",
  title: "Injury",
  world: "world/ends-of-magic",
  about: "world-mechanic/otherwhere-v-injury",
  facts: [
    {
      fact: "Cuts, bites, burns and breaks mend slowly.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A person beaten down falls senseless and bleeding, and dies within the hour untended.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A deep bite at the neck bleeds freely until it is pressed or bound.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
