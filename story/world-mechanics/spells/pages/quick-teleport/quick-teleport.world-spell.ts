import type { WorldSpell } from "../../world-spell.page-type.ts"

export const quickTeleport = {
  id: "01a06572-95db-7ed8-b121-fcbb909b76ec",
  pageTypeSlug: "world-spell",
  slug: "quick-teleport",
  title: "Quick Teleport",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
