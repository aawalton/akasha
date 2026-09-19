import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const veteranChainguard = {
  id: "01a06586-0a6f-7a5e-a73b-85d392af14a0",
  type: "page-type/world-class",
  slug: "veteran-chainguard",
  title: "Veteran Chainguard",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
