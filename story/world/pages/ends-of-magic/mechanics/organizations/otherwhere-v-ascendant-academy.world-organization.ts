import type { WorldOrganization } from "akasha/story/world/mechanics/organizations/world-organization.page-type.types.ts"

export const otherwhereVAscendantAcademy = {
  id: "01a0e9f4-227c-79ae-8d6d-e5290e8f1377",
  type: "page-type/world-organization",
  slug: "otherwhere-v-ascendant-academy",
  title: "The Ascendant Academy",
  world: "world/ends-of-magic",
  aliases: ["Ascendant Academy of Giantsrest", "Ascendent Academy", "the Ascendent Council"],
  description: "The academy of mages and archmages that rules Giantsrest.",
} as const satisfies WorldOrganization
