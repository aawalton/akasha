import type { PartnersSkill } from "akasha/story/world/pages/personas/stories/played/partners/mechanics/skills/partners-skill.page-type.types.ts"

export const partnersNatalieProvisioning = {
  id: "01a0de4f-5cbd-7db0-b88f-d9108edb43bc",
  type: "page-type/partners-skill",
  slug: "partners-natalie-provisioning",
  title: "Provisioning",
  character: "character-other/partners-natalie",
  skill: "world-skill/partners-provisioning",
} as const satisfies PartnersSkill
