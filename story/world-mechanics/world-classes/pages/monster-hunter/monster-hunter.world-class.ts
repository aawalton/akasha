import type { WorldClass } from "../../world-class.page-type.ts"

export const monsterHunter = {
  id: "01a0657e-13a3-7d97-9d50-dee3b46a9fd1",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "monster-hunter",
  title: "Monster Hunter",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
