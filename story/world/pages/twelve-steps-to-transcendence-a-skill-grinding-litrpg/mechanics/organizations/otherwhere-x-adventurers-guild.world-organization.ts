import type { WorldOrganization } from "akasha/story/world/mechanics/organizations/world-organization.page-type.types.ts"

export const otherwhereXAdventurersGuild = {
  id: "01a0ea78-4905-768c-9f07-f85b860369da",
  type: "page-type/world-organization",
  slug: "otherwhere-x-adventurers-guild",
  title: "The Adventurer's Guild",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  description: "A guild of adventurers.",
} as const satisfies WorldOrganization
