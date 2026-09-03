import type { WorldSpell } from "../../world-spell.page-type.ts"

export const prismaticWall = {
  id: "01a06572-95db-7c7e-92b3-72abe38db46a",
  pageTypeSlug: "world-spell",
  slug: "prismatic-wall",
  title: "Prismatic Wall",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
