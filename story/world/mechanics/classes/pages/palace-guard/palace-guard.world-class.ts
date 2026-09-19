import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const palaceGuard = {
  id: "01a0657e-0236-76c8-9924-8ea9fa625df5",
  type: "page-type/world-class",
  slug: "palace-guard",
  title: "Palace Guard",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
