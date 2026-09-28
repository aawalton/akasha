import type { WorldOrganization } from "akasha/story/world/mechanics/organizations/world-organization.page-type.types.ts"

export const otherwhereVAshenAccord = {
  id: "01a0e9fd-72d1-795a-8caa-fb88f07bfc6a",
  type: "page-type/world-organization",
  slug: "otherwhere-v-ashen-accord",
  title: "The Ashen Accord",
  world: "world/ends-of-magic",
  aliases: ["the Accord"],
  description: "A large grid of Questors.",
} as const satisfies WorldOrganization
