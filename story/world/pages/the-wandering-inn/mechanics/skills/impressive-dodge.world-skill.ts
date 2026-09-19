import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const impressiveDodge = {
  id: "01a06575-981d-7422-a69f-695522067ee1",
  type: "page-type/world-skill",
  slug: "impressive-dodge",
  title: "Impressive Dodge",
  world: "world/the-wandering-inn",
} as const satisfies WorldSkill
