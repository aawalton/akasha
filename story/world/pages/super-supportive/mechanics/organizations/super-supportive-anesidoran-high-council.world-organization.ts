import type { WorldOrganization } from "akasha/story/world/mechanics/organizations/world-organization.page-type.types.ts"

export const superSupportiveAnesidoranHighCouncil = {
  id: "01a0e9f1-bb28-7ff3-93ae-3375ab1aa7ee",
  type: "page-type/world-organization",
  slug: "super-supportive-anesidoran-high-council",
  title: "Anesidoran High Council",
  world: "world/super-supportive",
  aliases: ["council"],
  description: "Anesidora's governing council, with class seats and a President.",
} as const satisfies WorldOrganization
