import type { WorldSpell } from "../../world-spell.page-type.ts"

export const unlockDoor = {
  id: "01a06572-95e8-753a-aaec-d5ce2f68276c",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "unlock-door",
  title: "Unlock Door",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
