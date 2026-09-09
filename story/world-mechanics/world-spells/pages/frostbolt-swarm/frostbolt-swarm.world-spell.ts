import type { WorldSpell } from "../../world-spell.page-type.ts"

export const frostboltSwarm = {
  id: "01a06572-95c5-7002-b207-060063b5b1ea",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "frostbolt-swarm",
  title: "Frostbolt Swarm",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
