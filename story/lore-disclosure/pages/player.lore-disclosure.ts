import type { LoreDisclosure } from "akasha/story/lore-disclosure/lore-disclosure.page-type.types.ts"

export const player = {
  id: "01a0d419-9cce-7ef7-b592-5ed247fa1a06",
  type: "page-type/lore-disclosure",
  slug: "player",
  title: "Player",
  definition: "known to those playing",
} as const satisfies LoreDisclosure
