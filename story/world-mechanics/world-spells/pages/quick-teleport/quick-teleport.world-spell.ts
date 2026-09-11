import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const quickTeleport = {
  id: "01a06572-95db-7ed8-b121-fcbb909b76ec",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "quick-teleport",
  title: "Quick Teleport",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
