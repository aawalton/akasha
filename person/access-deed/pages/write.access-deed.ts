import type { AccessDeed } from "akasha/person/access-deed/access-deed.page-type.types.ts"

export const write = {
  id: "01a0c4e6-4d9d-715d-bda4-3e7d40a06db3",
  type: "page-type/access-deed",
  slug: "write",
  definition: "changing what a thing holds",
} as const satisfies AccessDeed
