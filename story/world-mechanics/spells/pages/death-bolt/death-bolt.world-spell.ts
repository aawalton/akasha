import type { WorldSpell } from "../../world-spell.page-type.ts"

export const deathBolt = {
  id: "01a06572-95bb-7fbd-9661-ad389262aec7",
  pageTypeSlug: "world-spell",
  slug: "death-bolt",
  title: "Death Bolt",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
