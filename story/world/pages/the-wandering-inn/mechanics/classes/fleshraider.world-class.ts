import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const fleshraider = {
  id: "01a0657e-01dd-7090-a108-67babcfa59e5",
  type: "page-type/world-class",
  slug: "fleshraider",
  title: "Fleshraider",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
} as const satisfies WorldClass
