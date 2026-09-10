import type { Domain } from "../domains/domain.page-type.types.ts"

export const id = {
  id: "01a05c48-deeb-7011-83b1-73490aa9b3ca",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "id",
  definition: "how a fresh identifier is made",
  parts: ["module/random-id", "module/uuid-version-7"],
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here knows the thing an identifier this package makes will name.",
    },
  ],
} as const satisfies Domain
