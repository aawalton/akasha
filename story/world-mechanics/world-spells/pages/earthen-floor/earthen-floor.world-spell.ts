import type { WorldSpell } from "../../world-spell.page-type.ts"

export const earthenFloor = {
  id: "01a06572-95be-7972-b40b-b4403690029a",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "earthen-floor",
  title: "Earthen Floor",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
