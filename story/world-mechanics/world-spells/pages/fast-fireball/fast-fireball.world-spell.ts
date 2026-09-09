import type { WorldSpell } from "../../world-spell.page-type.ts"

export const fastFireball = {
  id: "01a06572-95c0-7499-8194-5d655c8fafff",
  pageTypeSlug: "world-spell",
  slug: "fast-fireball",
  title: "Fast Fireball",
  world: "the-wandering-inn",
  aliases: ["Fast Fireball!"],
  references: "jsonl",
} as const satisfies WorldSpell
