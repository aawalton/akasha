import type { WorldOrganization } from "akasha/story/world/mechanics/organizations/world-organization.page-type.types.ts"

export const otherwhereVGiantsrestDominion = {
  id: "01a0e9f3-5ca5-7770-9e44-0d5d426ee13a",
  type: "page-type/world-organization",
  slug: "otherwhere-v-giantsrest-dominion",
  title: "The Giantsrest Dominion",
  world: "world/ends-of-magic",
  aliases: ["Giantsrest"],
  description: "A slave-holding mage-empire ruled from the city of Giantsrest.",
} as const satisfies WorldOrganization
