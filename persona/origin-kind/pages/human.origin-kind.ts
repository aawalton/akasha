import type { OriginKind } from "akasha/persona/origin-kind/origin-kind.page-type.types.ts"

export const human = {
  id: "01a05361-be5e-7cf5-9786-499ee90082b7",
  type: "page-type/origin-kind",
  slug: "human",
  definition: "an ordinary human name",
} as const satisfies OriginKind
