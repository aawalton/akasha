import type { AccessDeed } from "akasha/person/access-deed/access-deed.page-type.types.ts"

export const read = {
  id: "01a0c4e6-2f13-7717-9888-7a5cbeb323d8",
  type: "page-type/access-deed",
  slug: "read",
  definition: "being answered what a thing holds",
} as const satisfies AccessDeed
