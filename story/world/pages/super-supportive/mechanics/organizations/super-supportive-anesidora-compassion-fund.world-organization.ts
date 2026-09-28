import type { WorldOrganization } from "akasha/story/world/mechanics/organizations/world-organization.page-type.types.ts"

export const superSupportiveAnesidoraCompassionFund = {
  id: "01a0e9f1-bb28-7e11-9b07-1fd0d8621a9d",
  type: "page-type/world-organization",
  slug: "super-supportive-anesidora-compassion-fund",
  title: "Anesidora Compassion Fund",
  world: "world/super-supportive",
  description: "A fund for people hurt in superhuman incidents.",
} as const satisfies WorldOrganization
