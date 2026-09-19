import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const trustedSergeant = {
  id: "01a06586-0a6d-7ce8-963d-a529006a3727",
  type: "page-type/world-class",
  slug: "trusted-sergeant",
  title: "Trusted Sergeant",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
