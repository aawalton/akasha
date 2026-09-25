import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const changeMechanicalFileContentRename = {
  id: "01a07cc0-05e8-7a25-818b-3795f0fc2ef1",
  type: "page-type/domain",
  slug: "change-mechanical-file-content-rename",
  definition: "a mechanical change that changes a name",
  parts: [
    "change-mechanical-file-content/rename-entry-key",
    "change-mechanical-file-content/rename-export",
    "change-mechanical-file-content/rename-local-variable",
    "change-mechanical-file-content/rename-page-property-key",
    "change-mechanical-file-content/rename-property-signature",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A rung here spells a name anew inside a body the caller names.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No rung here has a file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The change composing these rungs judges the edges the whole rename leaves.",
    },
  ],
} as const satisfies Domain
