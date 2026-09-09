import type { WorldSpell } from "../../world-spell.page-type.ts"

export const earthenPillar = {
  id: "01a06572-95be-7ff5-bd5d-3ad221a561a9",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "earthen-pillar",
  title: "Earthen Pillar",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
