import type { WorldSpell } from "../../world-spell.page-type.ts"

export const globeOfAir = {
  id: "01a06572-95c6-753f-b08a-5436ec99bbca",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "globe-of-air",
  title: "Globe of Air",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
