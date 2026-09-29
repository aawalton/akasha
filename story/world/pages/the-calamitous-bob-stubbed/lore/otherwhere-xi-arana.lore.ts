import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiArana = {
  id: "01a0ea77-aa11-7080-b844-532a065edea5",
  type: "page-type/lore",
  slug: "otherwhere-xi-arana",
  title: "Arana",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-arana",
  facts: [
    {
      fact: "Arana led a clan of the Harrakan Remnants, the old empire's cut-off southern descendants.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Arana's clan hoarded the Remnant Empire's offices, food and tools for itself.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Arana's clan held a rich valley in the north of the Remnants, burned by zealots.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Arana died when Harrak broke the Remnant Empire and took Frostway; Arana is dead.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
