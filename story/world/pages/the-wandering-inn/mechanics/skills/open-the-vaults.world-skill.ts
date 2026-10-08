import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const openTheVaults = {
  id: "01a0657d-027c-73a6-b713-daf5e2a07cf0",
  type: "page-type/world-skill",
  slug: "open-the-vaults",
  title: "Open the Vaults",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.588Z",
  updatedAt: "2026-09-22T13:32:52.000Z",
} as const satisfies WorldSkill
