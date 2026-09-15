import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const mendBones = {
  id: "01a06572-95d2-7f0a-bf75-b98f8fe22968",
  type: "world-spell",
  slug: "mend-bones",
  title: "Mend Bones",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
