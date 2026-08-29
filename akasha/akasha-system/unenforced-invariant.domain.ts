import type { Domain } from "../domain-system/domain/domain.page-type.ts"

export const unenforcedInvariant = {
  id: "01a04ae1-7271-7000-8252-f3ad95a153ee",
  pageTypeSlug: "domain",
  slug: "unenforced-invariant",
  definition: "an invariant nothing enforces",
} as const satisfies Domain
