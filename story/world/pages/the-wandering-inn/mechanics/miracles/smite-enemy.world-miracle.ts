import type { WorldMiracle } from "akasha/story/world/mechanics/miracles/world-miracle.page-type.types.ts"

export const smiteEnemy = {
  id: "01a0655a-7b7c-724a-bbf0-bbd056b44d58",
  type: "page-type/world-miracle",
  slug: "smite-enemy",
  title: "Smite Enemy",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T03:40:23.804Z",
  updatedAt: "2026-09-22T13:30:33.000Z",
} as const satisfies WorldMiracle
