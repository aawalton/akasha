import type { WorldSpell } from "../../world-spell.page-type.ts"

export const snowFlume = {
  id: "01a06572-95e1-7d7b-b441-07099a3bcbdc",
  pageTypeSlug: "world-spell",
  slug: "snow-flume",
  title: "Snow Flume",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
