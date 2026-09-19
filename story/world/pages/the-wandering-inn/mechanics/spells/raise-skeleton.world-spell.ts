import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const raiseSkeleton = {
  id: "01a06572-95dc-7142-b356-f7e19d969569",
  type: "page-type/world-spell",
  slug: "raise-skeleton",
  title: "Raise Skeleton",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
