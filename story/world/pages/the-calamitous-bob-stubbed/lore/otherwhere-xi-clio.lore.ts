import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiClio = {
  id: "01a0ea7a-6438-7903-8002-d690a9702da3",
  type: "page-type/lore",
  slug: "otherwhere-xi-clio",
  title: "Clio",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-clio",
  facts: [
    {
      fact: "Clio is a silverite golem, one of the children Solfis made; she loves to tell stories.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Clio once taught a farm child to read, and golems carve stones with children's tales for it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Clio patrols the reclaimed green zone of the old capital with her sister Themis.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Clio fought the Nemeti fleet at Grand Beach with her golem siblings.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Clio serves New Harrak, back from the final war with her siblings.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
