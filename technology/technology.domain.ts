import type { Domain } from "../domains/domains/domain.page-type.ts"

export const technology = {
  id: "01a065a0-1406-75cf-a0c3-0f1b9a3842e7",
  pageTypeSlug: "domain",
  slug: "technology",
  definition: "how outside systems should be used",
  partSlugs: ["domain/technology-definitions", "domain/mcp"],
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A system's terms change without notice.",
    },
  ],
} as const satisfies Domain
