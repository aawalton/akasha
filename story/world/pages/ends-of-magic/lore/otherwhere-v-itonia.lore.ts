import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVItonia = {
  id: "01a0e9f7-12e8-79bc-9a3a-674e06223dd7",
  type: "page-type/lore",
  slug: "otherwhere-v-itonia",
  title: "Itonia",
  world: "world/ends-of-magic",
  about: "world-organization/otherwhere-v-itonia",
  facts: [
    {
      fact: "Itonia is a city-state run by oligarchs and guided by the Seers of Itonia.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Itonia keeps a Questor roster: Questor protectors who take turns guarding the city.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Siblings of Itonia are the city's warriors.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Itonian delicacies include local fruit vintages served in gourds.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
