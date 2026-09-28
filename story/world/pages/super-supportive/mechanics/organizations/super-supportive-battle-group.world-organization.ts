import type { WorldOrganization } from "akasha/story/world/mechanics/organizations/world-organization.page-type.types.ts"

export const superSupportiveBattleGroup = {
  id: "01a0e9f1-bb28-7ecb-9a1f-49b0fbc1046e",
  type: "page-type/world-organization",
  slug: "super-supportive-battle-group",
  title: "Battle Group",
  world: "world/super-supportive",
  description: "A team of Avowed that takes turns fighting the demon allotment.",
} as const satisfies WorldOrganization
