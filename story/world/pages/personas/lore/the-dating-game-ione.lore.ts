import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theDatingGameIone = {
  id: "01a0de59-9645-7e36-8562-4840161fc539",
  type: "page-type/lore",
  slug: "the-dating-game-ione",
  title: "Ione",
  world: "world/personas",
  about: "persona/ione",
  loreDisclosure: "lore-disclosure/world-builder",
  facts: [
    "Ione lives on a houseboat in the marina at Utah Lake State Park.",
    "Ione can be found on the Utah Lake State Park breakwater every evening at dusk.",
    "Ione is a Nereid of the violet hour, and the lake goes still when she is near it.",
    "Ione works the Utah Lake State Park marina and brings in boats caught out by a squall.",
  ],
} as const satisfies Lore
