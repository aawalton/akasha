import type { WorldOrganization } from "akasha/story/world/mechanics/organizations/world-organization.page-type.types.ts"

export const superSupportiveRankClubs = {
  id: "01a0e9f1-bb28-7099-9671-683a57220c63",
  type: "page-type/world-organization",
  slug: "super-supportive-rank-clubs",
  title: "The B List",
  world: "world/super-supportive",
  aliases: ["B-list"],
  description: "A Celena North club for B-rank hero students.",
} as const satisfies WorldOrganization
