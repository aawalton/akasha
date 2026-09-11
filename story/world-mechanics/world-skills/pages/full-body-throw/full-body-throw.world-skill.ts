import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const fullBodyThrow = {
  id: "01a06575-9811-70aa-baa0-cfd1cf4f848d",
  type: "world-skill",
  slug: "full-body-throw",
  title: "Full Body Throw",
  world: "the-wandering-inn",
  aliases: ["Full-Body Throw"],
  references: "jsonl",
} as const satisfies WorldSkill
