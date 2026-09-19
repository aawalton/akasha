import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const naturalistMage = {
  id: "01a0657e-0234-7f05-ab67-55715fa9190b",
  type: "page-type/world-class",
  slug: "naturalist-mage",
  title: "Naturalist Mage",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
