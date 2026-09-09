import type { WorldSpell } from "../../world-spell.page-type.ts"

export const midnightShard = {
  id: "01a06572-95d9-7cc4-a770-f460358ad4fd",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "midnight-shard",
  title: "Midnight Shard",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
