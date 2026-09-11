import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const palaceOfFates = {
  id: "01a0657d-0286-765e-9ffa-c9fecb35af6c",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "palace-of-fates",
  title: "Palace of Fates",
  world: "the-wandering-inn",
  aliases: ["PALACE OF FATES"],
  references: "jsonl",
} as const satisfies WorldSkill
