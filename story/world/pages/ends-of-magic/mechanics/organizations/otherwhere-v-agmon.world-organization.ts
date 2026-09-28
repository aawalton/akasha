import type { WorldOrganization } from "akasha/story/world/mechanics/organizations/world-organization.page-type.types.ts"

export const otherwhereVAgmon = {
  id: "01a0e9f6-77ec-7114-b2e3-d04e1f9a4b9d",
  type: "page-type/world-organization",
  slug: "otherwhere-v-agmon",
  title: "Agmon",
  world: "world/ends-of-magic",
  aliases: ["the empire of Agmon"],
  description: "An orcish empire in the far west of the Giantsrest continent.",
} as const satisfies WorldOrganization
