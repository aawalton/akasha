import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const openTheVault = {
  id: "01a0657d-027c-79b2-ad4e-733562e4fe02",
  type: "page-type/world-skill",
  slug: "open-the-vault",
  title: "Open the Vault",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.588Z",
  updatedAt: "2026-09-22T13:32:52.000Z",
} as const satisfies WorldSkill
