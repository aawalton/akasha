import type { WorldOrganization } from "akasha/story/world/mechanics/organizations/world-organization.page-type.types.ts"

export const superSupportiveSiblinghold = {
  id: "01a0e9f5-fded-7130-9a4e-add28782756f",
  type: "page-type/world-organization",
  slug: "super-supportive-siblinghold",
  title: "siblinghold",
  world: "world/super-supportive",
  description:
    "An Artonan household founded by siblings, with spouses as its backbone and children born in sets.",
} as const satisfies WorldOrganization
