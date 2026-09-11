import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const openTheVaults = {
  id: "01a0657d-027c-73a6-b713-daf5e2a07cf0",
  type: "world-skill",
  slug: "open-the-vaults",
  title: "Open the Vaults",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
