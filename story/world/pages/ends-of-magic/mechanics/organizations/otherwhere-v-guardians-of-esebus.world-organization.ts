import type { WorldOrganization } from "akasha/story/world/mechanics/organizations/world-organization.page-type.types.ts"

export const otherwhereVGuardiansOfEsebus = {
  id: "01a0e9f8-bd22-7985-80f1-620339ec9750",
  type: "page-type/world-organization",
  slug: "otherwhere-v-guardians-of-esebus",
  title: "The Guardians of Esebus",
  world: "world/ends-of-magic",
  aliases: ["Esebus soldiers"],
  description: "The flying soldiers of Esebus, who patrol its continent in winged armor.",
} as const satisfies WorldOrganization
