import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const gangster = {
  id: "01a0657e-1366-7e6e-9265-537d5447ce90",
  type: "page-type/world-class",
  slug: "gangster",
  title: "Gangster",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
