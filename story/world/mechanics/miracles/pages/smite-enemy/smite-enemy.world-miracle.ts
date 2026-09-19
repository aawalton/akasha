import type { WorldMiracle } from "akasha/story/world/mechanics/miracles/world-miracle.page-type.types.ts"

export const smiteEnemy = {
  id: "01a0655a-7b7c-724a-bbf0-bbd056b44d58",
  type: "page-type/world-miracle",
  slug: "smite-enemy",
  title: "Smite Enemy",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldMiracle
