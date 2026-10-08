import type { WorldMiracle } from "akasha/story/world/mechanics/miracles/world-miracle.page-type.types.ts"

export const baneOfLuck = {
  id: "01a0655a-7b7c-7a47-8969-d7026b2d3c98",
  type: "page-type/world-miracle",
  slug: "bane-of-luck",
  title: "Bane of Luck",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T03:40:23.804Z",
  updatedAt: "2026-09-22T13:30:33.000Z",
} as const satisfies WorldMiracle
