import type { AccessKind } from "akasha/person/access-kind/access-kind.page-type.types.ts"

export const route = {
  id: "01a0542d-4b9d-74e1-98b8-4892e4ed15b5",
  type: "access-kind",
  slug: "route",
  definition: "a path the web answers a request on",
} as const satisfies AccessKind
