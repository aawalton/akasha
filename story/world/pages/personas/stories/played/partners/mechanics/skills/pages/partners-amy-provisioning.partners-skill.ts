import type { PartnersSkill } from "akasha/story/world/pages/personas/stories/played/partners/mechanics/skills/partners-skill.page-type.types.ts"

export const partnersAmyProvisioning = {
  id: "01a0de4f-5cbd-771e-90ac-b037da4bf80a",
  type: "page-type/partners-skill",
  slug: "partners-amy-provisioning",
  title: "Provisioning",
  character: "character-other/partners-amy",
  skill: "world-skill/partners-provisioning",
} as const satisfies PartnersSkill
