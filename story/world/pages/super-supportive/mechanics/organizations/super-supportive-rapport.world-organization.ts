import type { WorldOrganization } from "akasha/story/world/mechanics/organizations/world-organization.page-type.types.ts"

export const superSupportiveRapport = {
  id: "01a0e9f9-7734-73d2-834f-a532bf004bea",
  type: "page-type/world-organization",
  slug: "super-supportive-rapport",
  title: "Rapport",
  world: "world/super-supportive",
  aliases: ["the Rapports", "Rapport I", "Rapport III"],
  description:
    "One of the Mother planet's seven knightly lands, where knights and votaries are raised.",
} as const satisfies WorldOrganization
