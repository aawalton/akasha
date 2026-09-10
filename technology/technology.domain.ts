import type { Domain } from "../domains/domain.page-type.types.ts"

export const technology = {
  id: "01a065a0-1406-75cf-a0c3-0f1b9a3842e7",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "technology",
  definition: "how outside systems should be used",
  parts: ["domain/technology-definitions", "domain/mcp"],
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A system's terms change without notice.",
    },
  ],
} as const satisfies Domain
