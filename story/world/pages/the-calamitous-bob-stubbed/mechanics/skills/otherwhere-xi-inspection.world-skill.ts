import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const otherwhereXiInspection = {
  id: "01a0ea7a-bf9e-7897-bb3b-ca0a6ad38748",
  type: "page-type/world-skill",
  slug: "otherwhere-xi-inspection",
  title: "Inspection",
  world: "world/the-calamitous-bob-stubbed",
  description: "A skill that reads a person, creature or thing into a short bracketed summary.",
  aliases: ["Inspect", "Analysis"],
} as const satisfies WorldSkill
