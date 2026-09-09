import type { WorldSpell } from "../../world-spell.page-type.ts"

export const earthenRamparts = {
  id: "01a06572-95be-7753-a0f5-2bf5400b3da5",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "earthen-ramparts",
  title: "Earthen Ramparts",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
