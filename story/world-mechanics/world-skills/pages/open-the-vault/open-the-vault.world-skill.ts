import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const openTheVault = {
  id: "01a0657d-027c-79b2-ad4e-733562e4fe02",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "open-the-vault",
  title: "Open the Vault",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
