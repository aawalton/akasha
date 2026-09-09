import type { WorldSpell } from "../../world-spell.page-type.ts"

export const acidStorm = {
  id: "01a06572-95b3-71ee-89ba-5ce606fffc10",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "acid-storm",
  title: "Acid Storm",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
