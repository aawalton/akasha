import type { WorldOrganization } from "akasha/story/world/mechanics/organizations/world-organization.page-type.types.ts"

export const otherwhereVCouncilOfEightyNine = {
  id: "01a0ea01-0e97-7ee7-9d9b-faccee0ca497",
  type: "page-type/world-organization",
  slug: "otherwhere-v-council-of-eighty-nine",
  title: "The Council of Eighty-Nine",
  world: "world/ends-of-magic",
  aliases: ["the original council"],
  description: "A council of Questors.",
} as const satisfies WorldOrganization
