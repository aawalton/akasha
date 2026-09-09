import type { Domain } from "../../../../domains/domain.page-type.ts"

export const changeMechanicalFileContentMove = {
  id: "01a081e2-c23a-7af0-ba22-629889727cb3",
  pageTypeSlug: "domain",
  slug: "change-mechanical-file-content-move",
  definition: "a mechanical change moving part of what a file holds to another place",
  parts: ["change-mechanical-file-content/move-property-value"],
  invariants: [
    {
      invariantKind: "absence",
      statement: "No rung here moves a value out of one file and into another.",
    },
    {
      invariantKind: "departure",
      statement: "Such a move is a remove and an add, which the changes for those answer.",
    },
  ],
} as const satisfies Domain
