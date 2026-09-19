import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const beastMaster = {
  id: "01a0657e-133d-75c7-910a-bfbdf1474533",
  type: "page-type/world-class",
  slug: "beast-master",
  title: "Beast Master",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
