import type { WorldOrganization } from "akasha/story/world/mechanics/organizations/world-organization.page-type.types.ts"

export const superSupportiveSuperhumansAtLarge = {
  id: "01a0e9f9-c6a4-7c98-9124-7e3aea40156b",
  type: "page-type/world-organization",
  slug: "super-supportive-superhumans-at-large",
  title: "Superhumans at Large",
  world: "world/super-supportive",
  aliases: ["SAL"],
  description: "An often violent movement of runaway and unregistered Avowed.",
} as const satisfies WorldOrganization
