import type { Domain } from "../domain/domain.page-type.ts"

export const contextWarrant = {
  id: "01a04db3-d594-7f29-add6-ad3e4287cdf9",
  pageTypeSlug: "domain",
  slug: "context-warrant",
  definition: "why a seat must read a page",
  partSlugs: ["domain/context-warrant-file"],
  invariants: [
    {
      invariantKind: "gap",
      statement: "Every page a seat must read stands under whatever warrants it.",
    },
  ],
} as const satisfies Domain
