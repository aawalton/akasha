import type { WorldOrganization } from "akasha/story/world/mechanics/organizations/world-organization.page-type.types.ts"

export const otherwhereXiDarkBlades = {
  id: "01a0ea81-c317-7f73-85bf-d34d38bc7901",
  type: "page-type/world-organization",
  slug: "otherwhere-xi-dark-blades",
  title: "The Dark Blades",
  world: "world/the-calamitous-bob-stubbed",
  description: "A guild of trained assassins serving Luten.",
} as const satisfies WorldOrganization
