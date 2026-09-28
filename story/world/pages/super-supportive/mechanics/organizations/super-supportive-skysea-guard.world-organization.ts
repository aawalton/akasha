import type { WorldOrganization } from "akasha/story/world/mechanics/organizations/world-organization.page-type.types.ts"

export const superSupportiveSkyseaGuard = {
  id: "01a0e9f1-bb29-71b7-8d3e-e979edb8b7f6",
  type: "page-type/world-organization",
  slug: "super-supportive-skysea-guard",
  title: "SkySea Guard",
  world: "world/super-supportive",
  description: "A patrol near Matadero that also runs air traffic and flight paths.",
} as const satisfies WorldOrganization
