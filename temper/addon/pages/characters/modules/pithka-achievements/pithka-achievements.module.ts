import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pithkaAchievements = {
  id: "01a0de7b-0703-7cf6-b69e-3e29b9a778ef",
  type: "page-type/module",
  slug: "pithka-achievements",
  definition:
    "the dungeons, trials and arenas the achievement tracker lists, with each one's achievements",
  code: "ts",
} as const satisfies Module
