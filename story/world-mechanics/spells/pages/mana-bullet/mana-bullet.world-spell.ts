import type { WorldSpell } from "../../world-spell.page-type.ts"

export const manaBullet = {
  id: "01a06572-95d1-78ac-b0a8-d802747bc05b",
  pageTypeSlug: "world-spell",
  slug: "mana-bullet",
  title: "Mana Bullet",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["mana-arrow"],
  references: "jsonl",
} as const satisfies WorldSpell
