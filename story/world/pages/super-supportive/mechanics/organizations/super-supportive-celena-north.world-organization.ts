import type { WorldOrganization } from "akasha/story/world/mechanics/organizations/world-organization.page-type.types.ts"

export const superSupportiveCelenaNorth = {
  id: "01a0e9f1-bb28-7c89-9c73-6034a13e15e5",
  type: "page-type/world-organization",
  slug: "super-supportive-celena-north",
  title: "Celena North",
  world: "world/super-supportive",
  aliases: ["CNH"],
  description: "An Apex school with a hero track.",
} as const satisfies WorldOrganization
