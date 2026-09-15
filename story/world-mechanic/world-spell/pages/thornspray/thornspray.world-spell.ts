import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const thornspray = {
  id: "01a06572-95e6-7519-b202-94f5907e1fd1",
  type: "world-spell",
  slug: "thornspray",
  title: "Thornspray",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
