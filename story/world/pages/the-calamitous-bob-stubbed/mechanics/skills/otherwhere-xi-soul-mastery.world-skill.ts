import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const otherwhereXiSoulMastery = {
  id: "01a0ea8e-6697-79d7-a3d7-c642fd8601e7",
  type: "page-type/world-skill",
  slug: "otherwhere-xi-soul-mastery",
  title: "Soul Mastery",
  world: "world/the-calamitous-bob-stubbed",
  description: "A skill for feeling, handling and growing one's own soul.",
  aliases: ["Soul Master", "Soul sense"],
} as const satisfies WorldSkill
