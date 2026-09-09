import type { WorldSpell } from "../../world-spell.page-type.ts"

export const dustCloud = {
  id: "01a06572-95be-7af0-afdb-1810cdd732b3",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "dust-cloud",
  title: "Dust Cloud",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
