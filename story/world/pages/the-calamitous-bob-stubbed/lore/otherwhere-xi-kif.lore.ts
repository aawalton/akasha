import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiKif = {
  id: "01a0ea8b-d300-7ee3-9dc8-d576934f0a77",
  type: "page-type/lore",
  slug: "otherwhere-xi-kif",
  title: "Harbormaster Kif",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-kif",
  facts: [
    {
      fact: "Kif is an old Shadowlander, once harbor master of Korrim, greatest city of the Shadow Lands.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Kif fled to the Azure Lady's haven, where he runs its fishing and sea farms.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Kif's nephew died; Kif told Viv of Korrim's history and of King Oleander's rule.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Kif is thought to be with the Azure Lady's exiles at End of the World.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
