import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIxPortalAmulet = {
  id: "01a0ea42-1ac1-7d76-9389-b9112dfe1679",
  type: "page-type/lore",
  slug: "otherwhere-ix-portal-amulet",
  title: "Portal Amulet",
  world: "world/mana-devourer-litrpgmana-cultivation",
  about: "world-item/otherwhere-ix-portal-amulet",
  facts: [
    {
      fact: "A portal amulet carries its wearer to a place it is tied to, within a set range.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The portal amulet the god Maxen offered reached his brothel from up to thirty miles away.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Maxen offered one to an arena fighter as part of a fifty-year service contract.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
