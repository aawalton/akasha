import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const baron = {
  id: "01a0657e-133c-7098-909a-319e39a55d5a",
  type: "world-class",
  slug: "baron",
  title: "Baron",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
