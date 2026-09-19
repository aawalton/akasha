import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const myBladeIsFaster = {
  id: "01a0657d-0270-7456-bbd0-b0f980351ea0",
  type: "page-type/world-skill",
  slug: "my-blade-is-faster",
  title: "My Blade is Faster",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
