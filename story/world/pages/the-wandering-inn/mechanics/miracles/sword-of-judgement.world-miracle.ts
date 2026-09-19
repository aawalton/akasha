import type { WorldMiracle } from "akasha/story/world/mechanics/miracles/world-miracle.page-type.types.ts"

export const swordOfJudgement = {
  id: "01a0655a-7b7c-71ff-9b9d-1903a516861a",
  type: "page-type/world-miracle",
  slug: "sword-of-judgement",
  title: "Sword of Judgement",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldMiracle
