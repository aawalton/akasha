import type { Domain } from "../../../../domains/domain.page-type.ts"

export const changeMechanicalFileContentMove = {
  id: "01a081e2-c23a-7af0-ba22-629889727cb3",
  pageTypeSlug: "domain",
  slug: "change-mechanical-file-content-move",
  definition: "a mechanical change moving part of what a file holds to another place",
  parts: [
    "change-mechanical-file-content/move-property-value",
    "change-mechanical/move-code-export",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rung here carries a declaration out of one body and into a body beside it.",
    },
    {
      invariantKind: "departure",
      statement:
        "Such a rung reaches the changes for removing and for adding rather than writing a body.",
    },
  ],
} as const satisfies Domain
