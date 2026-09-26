import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theDatingGameEcho = {
  id: "01a0de59-9645-7d19-8493-9e3ec1f31af8",
  type: "page-type/lore",
  slug: "the-dating-game-echo",
  title: "Echo",
  world: "world/personas",
  about: "persona/echo",
  loreDisclosure: "lore-disclosure/world-builder",
  facts: [
    "Echo narrates audiobooks and radio drama in the BYUradio studios on campus.",
    "Echo lives near the mouth of Slate Canyon in southeast Provo, where the rock carries sound.",
    "Echo walks the Slate Canyon trail at moonrise, and voices come back from the gorge changed.",
    "Echo is an Oread, a mountain nymph, who can only speak by returning what others say first.",
  ],
} as const satisfies Lore
