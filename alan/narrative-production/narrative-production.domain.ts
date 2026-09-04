import type { Domain } from "../../domains/domains/domain.page-type.ts"

export const narrativeProduction = {
  id: "01a0673a-bc3a-7002-900d-98d54a36587e",
  pageTypeSlug: "domain",
  slug: "narrative-production",
  definition: "turning a story into narration and illustration",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A picture is made for one chapter.",
    },
    {
      invariantKind: "departure",
      statement:
        "A chapter's picture is rendered from the chapter rather than kept as a page of its own.",
    },
  ],
} as const satisfies Domain
