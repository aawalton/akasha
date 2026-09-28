import type { WorldOrganization } from "akasha/story/world/mechanics/organizations/world-organization.page-type.types.ts"

export const otherwhereVContinuanceCouncil = {
  id: "01a0ea01-0e97-7ab1-bf59-84bc8219c8fd",
  type: "page-type/world-organization",
  slug: "otherwhere-v-continuance-council",
  title: "The Continuance Council",
  world: "world/ends-of-magic",
  aliases: ["the Continuance Charter"],
  description: "An alliance of many countries.",
} as const satisfies WorldOrganization
