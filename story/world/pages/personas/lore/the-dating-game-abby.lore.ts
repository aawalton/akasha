import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theDatingGameAbby = {
  id: "01a0de59-9643-7fd6-a821-a912cde40083",
  type: "page-type/lore",
  slug: "the-dating-game-abby",
  title: "Abby",
  world: "world/personas",
  about: "persona/abby",
  loreDisclosure: "lore-disclosure/world-builder",
  facts: [
    "Abby runs Abby's Books, a used bookshop in an old brick storefront on Center Street.",
    "Abby keeps the shop open Tuesday to Saturday, ten until seven, and is always behind the counter.",
    "Abby rents the small flat above the shop and lets the tea in her mug go cold by the register.",
    "Abby hosts a quiet Thursday-evening reading circle in the shop's back room.",
  ],
} as const satisfies Lore
