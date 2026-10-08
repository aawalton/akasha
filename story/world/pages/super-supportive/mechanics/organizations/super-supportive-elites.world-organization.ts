import type { WorldOrganization } from "akasha/story/world/mechanics/organizations/world-organization.page-type.types.ts"

export const superSupportiveElites = {
  id: "01a0e9fb-2b67-70d0-930d-4692daac6f89",
  type: "page-type/world-organization",
  slug: "super-supportive-elites",
  title: "Elites",
  world: "world/super-supportive",
  aliases: ["Li Jean Elites"],
  description: "Li Jean's S-rank-only hero program, run like a separate school on its campus.",
  createdAt: "2026-09-28T21:45:47.111Z",
  updatedAt: "2026-09-28T21:45:51.000Z",
} as const satisfies WorldOrganization
