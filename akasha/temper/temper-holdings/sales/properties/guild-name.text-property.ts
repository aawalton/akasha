import type { TextProperty } from "@akasha/pages-system/text-property"

export type GuildName = string

export const guildName = {
  id: "01a0685d-89aa-7d2f-948c-fbca509592a2",
  pageTypeSlug: "text-property",
  slug: "guild-name",
  propertySlug: "guild-name",
  definition: "the guild whose store an item went through",
  max: 200,
  nameFormatSlug: null,
  invariants: [{ invariantKind: "gap", statement: "This property is a relation to a guild." }],
} as const satisfies TextProperty
