import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const superSupportiveSystemCall = {
  id: "01a0ea07-cbdc-7872-9562-cb0c67f45b4a",
  type: "page-type/lore",
  slug: "super-supportive-system-call",
  title: "System calls",
  world: "world/super-supportive",
  about: "world-mechanic/super-supportive-system-call",
  facts: [
    { fact: "A low-priority contact is put in a queue.", knowers: ["lore-disclosure/game-master"] },
  ],
  secrets: "jsonl",
  createdAt: "2026-09-28T21:59:34.620Z",
  updatedAt: "2026-09-29T02:00:59.000Z",
} as const satisfies Lore
