import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiFalstag = {
  id: "01a0ea82-c1aa-7aa1-8221-01360ad214e1",
  type: "page-type/lore",
  slug: "otherwhere-xi-falstag",
  title: "Duke Falstag",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-falstag",
  facts: [
    {
      fact: "Duke Falstag is a young Baranese duke whose duchy lies north of Eikart's.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Falstag's duchy has long suffered Hallurian raids.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Falstag led the Baranese at the pass after the Nemeti assassinated Duke Eikart.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Which side Falstag took in Baran's civil war, and where he is this season, is unknown.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
