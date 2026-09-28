import type { WorldOrganization } from "akasha/story/world/mechanics/organizations/world-organization.page-type.types.ts"

export const superSupportiveTriplanetaryGovernment = {
  id: "01a0e9f1-bb29-7f91-89b1-47e3aecab7c5",
  type: "page-type/world-organization",
  slug: "super-supportive-triplanetary-government",
  title: "Artonan Triplanetary Government",
  world: "world/super-supportive",
  aliases: ["the Triplanets"],
  description: "The government of the Artonan worlds.",
} as const satisfies WorldOrganization
