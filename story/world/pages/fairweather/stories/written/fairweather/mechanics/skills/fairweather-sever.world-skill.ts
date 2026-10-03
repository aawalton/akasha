import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fairweatherSever = {
  id: "01a102af-305c-72b2-a992-329704d509ab",
  type: "page-type/world-skill",
  slug: "fairweather-sever",
  title: "Sever",
  world: "world/fairweather",
  description: "A Warden skill that breaks a binding one person holds on another.",
} as const satisfies WorldSkill
