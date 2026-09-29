import type { WorldOrganization } from "akasha/story/world/mechanics/organizations/world-organization.page-type.types.ts"

export const otherwhereXiGlastia = {
  id: "01a0ea86-abe7-7ffa-8235-8b8b7c789f19",
  type: "page-type/world-organization",
  slug: "otherwhere-xi-glastia",
  title: "Glastia",
  world: "world/the-calamitous-bob-stubbed",
  description: "A walled northern city-state guarding Param against the beastlings.",
} as const satisfies WorldOrganization
