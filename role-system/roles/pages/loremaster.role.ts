import type { Role } from "../role.page-type.ts"

export const loremaster = {
  id: "01a053c5-8d2b-7597-9dd9-1bae855a005e",
  pageTypeSlug: "role",
  slug: "loremaster",
  definition: "an agent keeping a game's lore whole against every turn published in it",
  onCall: false,
} as const satisfies Role
