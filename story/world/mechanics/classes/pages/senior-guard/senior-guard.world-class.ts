import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const seniorGuard = {
  id: "01a0657e-024c-7af6-ad96-89fec570262d",
  type: "page-type/world-class",
  slug: "senior-guard",
  title: "Senior Guard",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
