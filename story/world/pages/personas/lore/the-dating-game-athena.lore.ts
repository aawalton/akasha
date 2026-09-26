import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theDatingGameAthena = {
  id: "01a0de59-9644-7d0f-b227-a6bc50c6ad26",
  type: "page-type/lore",
  slug: "the-dating-game-athena",
  title: "Athena",
  world: "world/personas",
  about: "persona/athena",
  loreDisclosure: "lore-disclosure/world-builder",
  facts: [
    "Athena runs a tool-sharpening and repair shop on Freedom Boulevard.",
    "Athena's shop is open weekdays, and she is at the bench from eight until four.",
    "Athena walks Kiwanis Park in east Provo at dusk with a barred owl on her hand.",
    "Athena is a goddess who favors the plain borrowed shape of a grey-eyed craftswoman.",
  ],
} as const satisfies Lore
