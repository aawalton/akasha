import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const changeMechanicalFileContentMove = {
  id: "01a081e2-c23a-7af0-ba22-629889727cb3",
  type: "page-type/domain",
  slug: "change-mechanical-file-content-move",
  definition: "a mechanical change that moves text",
  parts: [
    "change-mechanical-file-content/move-property-value",
    "change-mechanical/move-code-export",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A rung here carries a declaration out of one body and into another body.",
    },
  ],
} as const satisfies Domain
