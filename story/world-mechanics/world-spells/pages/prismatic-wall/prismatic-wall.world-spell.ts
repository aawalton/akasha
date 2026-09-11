import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const prismaticWall = {
  id: "01a06572-95db-7c7e-92b3-72abe38db46a",
  type: "world-spell",
  slug: "prismatic-wall",
  title: "Prismatic Wall",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
