import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theDatingGameAlan = {
  id: "01a0de64-9824-74bb-a428-f2b61d878b92",
  type: "page-type/lore",
  slug: "the-dating-game-alan",
  title: "Alan",
  world: "world/personas",
  about: "character-player/the-dating-game-alan",
  loreDisclosure: "lore-disclosure/player",
  facts: [
    "Alan lives alone at 1350 Apple Ave in Provo, Utah.",
    "Alan is single and has no children.",
    "Alan is recently retired and independently wealthy.",
    "Alan has no demands on his time or attention.",
    "Alan does not drink coffee.",
    "Alan drinks hot cocoa with breakfast.",
    "Alan's house has a table by a back window looking west over the valley to Utah Lake.",
    "Alan owns one mug, which dries in a rack in his kitchen.",
    "Alan's favorite clothes are black shorts over black compression tights and a loose grey shirt.",
    "Alan's favorite shoes are dusty light blue Ecco slip-ons.",
  ],
} as const satisfies Lore
