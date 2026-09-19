import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const mountAndRiderSharedSkills = {
  id: "01a0657d-026f-7643-9add-6595a17af5ed",
  type: "page-type/world-skill",
  slug: "mount-and-rider-shared-skills",
  title: "Mount and Rider: Shared Skills",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
