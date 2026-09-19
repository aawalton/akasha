import type { WorldMiracle } from "akasha/story/world/mechanics/miracles/world-miracle.page-type.types.ts"

export const purifyWounds = {
  id: "01a0655a-7b7c-7c0e-87eb-525dea46cbe5",
  type: "page-type/world-miracle",
  slug: "purify-wounds",
  title: "Purify Wounds",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldMiracle
