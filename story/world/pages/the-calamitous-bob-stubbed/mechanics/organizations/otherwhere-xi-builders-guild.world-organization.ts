import type { WorldOrganization } from "akasha/story/world/mechanics/organizations/world-organization.page-type.types.ts"

export const otherwhereXiBuildersGuild = {
  id: "01a0ea89-f42e-76ba-a348-b6a3285bcee1",
  type: "page-type/world-organization",
  slug: "otherwhere-xi-builders-guild",
  title: "The Builders' Guild",
  world: "world/the-calamitous-bob-stubbed",
  description: "A guild of builders and quarrymen of Param.",
} as const satisfies WorldOrganization
