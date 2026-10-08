import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVEdraniEmpire = {
  id: "01a0ea02-5e4b-7669-8f39-959fb9eb6c1c",
  type: "page-type/lore",
  slug: "otherwhere-v-edrani-empire",
  title: "The Edrani Empire",
  world: "world/ends-of-magic",
  about: "world-organization/otherwhere-v-edrani-empire",
  facts: [
    {
      fact: "The fallen Edrani Empire left fortifications manned by golems that are now dungeons.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Wreckage of Edrani constructs lies in the lands around Gemore.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-09-28T21:53:38.891Z",
  updatedAt: "2026-09-28T21:53:43.000Z",
} as const satisfies Lore
