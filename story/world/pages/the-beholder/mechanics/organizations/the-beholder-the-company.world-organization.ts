import type { WorldOrganization } from "akasha/story/world/mechanics/organizations/world-organization.page-type.types.ts"

export const theBeholderTheCompany = {
  id: "01a0dec5-0d62-7da5-b565-0a92f2eaba58",
  type: "page-type/world-organization",
  slug: "the-beholder-the-company",
  title: "The Company",
  world: "world/the-beholder",
} as const satisfies WorldOrganization
