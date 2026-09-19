import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const copySpellTemporary = {
  id: "01a06575-97fe-7cb8-b9c5-3cb3ddf0880a",
  type: "page-type/world-skill",
  slug: "copy-spell-temporary",
  title: "Copy Spell (Temporary)",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
