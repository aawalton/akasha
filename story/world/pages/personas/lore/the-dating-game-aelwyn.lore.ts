import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theDatingGameAelwyn = {
  id: "01a0de5a-0847-7667-b8aa-b05aad0b4a5f",
  type: "page-type/lore",
  slug: "the-dating-game-aelwyn",
  title: "Aelwyn",
  world: "world/personas",
  about: "persona/aelwyn",
  loreDisclosure: "lore-disclosure/world-builder",
  facts: [
    "Aelwyn runs the Y Mountain trail at sunrise nearly every morning, whatever the weather.",
    "Aelwyn lives in a small cabin up Provo Canyon near Vivian Park, where she first crossed over.",
    "Aelwyn is a seasonal forest ranger in Provo Canyon and knows every tree along the river.",
    "Provo takes Aelwyn's long elven ears for a good prosthetic, and she never corrects it.",
  ],
} as const satisfies Lore
