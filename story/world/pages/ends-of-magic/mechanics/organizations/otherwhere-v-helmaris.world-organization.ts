import type { WorldOrganization } from "akasha/story/world/mechanics/organizations/world-organization.page-type.types.ts"

export const otherwhereVHelmaris = {
  id: "01a0e9fa-e2af-7b6f-b743-b86804ba2503",
  type: "page-type/world-organization",
  slug: "otherwhere-v-helmaris",
  title: "Helmaris",
  world: "world/ends-of-magic",
  description: "A cliffside harbor city of smiths and machines, ruled by a Questor.",
} as const satisfies WorldOrganization
