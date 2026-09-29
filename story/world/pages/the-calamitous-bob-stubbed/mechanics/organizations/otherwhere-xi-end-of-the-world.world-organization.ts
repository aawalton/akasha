import type { WorldOrganization } from "akasha/story/world/mechanics/organizations/world-organization.page-type.types.ts"

export const otherwhereXiEndOfTheWorld = {
  id: "01a0ea86-1105-7b37-8c51-b5f5480e15e9",
  type: "page-type/world-organization",
  slug: "otherwhere-xi-end-of-the-world",
  title: "The End of the World",
  world: "world/the-calamitous-bob-stubbed",
  description: "A free city of exiled mages on Param's north-western tip.",
} as const satisfies WorldOrganization
