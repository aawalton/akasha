import type { WorldSpell } from "../../world-spell.page-type.ts"

export const concealedPresence = {
  id: "01a06572-95b9-7949-9a23-08249a69dcc5",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "concealed-presence",
  title: "Concealed Presence",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
