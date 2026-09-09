import type { WorldSpell } from "../../world-spell.page-type.ts"

export const webOfMagnesis = {
  id: "01a06572-95e9-7e97-a3c0-04ebf273323c",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "web-of-magnesis",
  title: "Web of Magnesis",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
