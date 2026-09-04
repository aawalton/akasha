import type { WorldSpell } from "../../world-spell.page-type.ts"

export const iceWall = {
  id: "01a06572-95ca-7c86-9706-06d8ea78e8ee",
  pageTypeSlug: "world-spell",
  slug: "ice-wall",
  title: "Ice Wall",
  worldSlug: "the-wandering-inn",
  aliases: ["Ice Wall!"],
  references: "jsonl",
} as const satisfies WorldSpell
