import type { PartnersIiSkill } from "akasha/story/world/pages/personas/stories/played/partners-ii/mechanics/skills/partners-ii-skill.page-type.types.ts"

export const partnersIiAmyProvisioning = {
  id: "01a0de4e-6838-795f-b87f-4bfd1465c62e",
  type: "page-type/partners-ii-skill",
  slug: "partners-ii-amy-provisioning",
  title: "Provisioning",
  character: "character-other/partners-ii-amy",
  skill: "world-skill/partners-ii-provisioning",
} as const satisfies PartnersIiSkill
