import type { WorldOrganization } from "akasha/story/world/mechanics/organizations/world-organization.page-type.types.ts"

export const superSupportiveLeafsongUniversity = {
  id: "01a0e9f1-bb28-71c4-9621-e0cce8a05e54",
  type: "page-type/world-organization",
  slug: "super-supportive-leafsong-university",
  title: "LeafSong University",
  world: "world/super-supportive",
  description: "An Artonan wizard university on Artona III.",
} as const satisfies WorldOrganization
