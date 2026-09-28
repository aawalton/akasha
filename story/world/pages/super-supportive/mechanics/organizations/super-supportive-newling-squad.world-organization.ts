import type { WorldOrganization } from "akasha/story/world/mechanics/organizations/world-organization.page-type.types.ts"

export const superSupportiveNewlingSquad = {
  id: "01a0e9f9-7734-7b4f-a10f-86f76ee1a96e",
  type: "page-type/world-organization",
  slug: "super-supportive-newling-squad",
  title: "Newling squad",
  world: "world/super-supportive",
  aliases: ["squad"],
  description: "A small group of young knights who train and serve together.",
} as const satisfies WorldOrganization
