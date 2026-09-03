import type { WorldSpell } from "../../world-spell.page-type.ts"

export const autocastSpeedSpell = {
  id: "01a06572-95b5-75f1-a833-5ec254fcf692",
  pageTypeSlug: "world-spell",
  slug: "autocast-speed-spell",
  title: "Autocast: Speed Spell",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
