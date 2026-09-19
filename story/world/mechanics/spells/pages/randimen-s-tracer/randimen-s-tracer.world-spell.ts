import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const randimenSTracer = {
  id: "01a06572-95dc-7c79-ae2d-e4506355ec5b",
  type: "page-type/world-spell",
  slug: "randimen-s-tracer",
  title: "Randimen’s Tracer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
