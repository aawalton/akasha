import type { WorldOrganization } from "akasha/story/world/mechanics/organizations/world-organization.page-type.types.ts"

export const superSupportivePresixters = {
  id: "01a0e9f9-c6a4-7a63-9403-05a89b783244",
  type: "page-type/world-organization",
  slug: "super-supportive-presixters",
  title: "Presixters",
  world: "world/super-supportive",
  description:
    "Fringe alien-haters who want to delete the System and roll the timeline back to 1959.",
} as const satisfies WorldOrganization
