import type { WorldOrganization } from "akasha/story/world/mechanics/organizations/world-organization.page-type.types.ts"

export const superSupportivePurityPeople = {
  id: "01a0e9f9-c6a4-7ea8-ba6d-5a42f2314cc2",
  type: "page-type/world-organization",
  slug: "super-supportive-purity-people",
  title: "Purity people",
  world: "world/super-supportive",
  description: 'A movement that calls anyone working for Artonans an "alien bumkisser".',
} as const satisfies WorldOrganization
