import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const changeMechanicalFileRemove = {
  id: "01a07cbe-1911-72dc-869f-8e733656bc1b",
  type: "page-type/domain",
  slug: "change-mechanical-file-remove",
  definition: "a mechanical change that removes a file",
  parts: [
    "change-mechanical-file/remove-file",
    "change-mechanical-file/remove-file-page",
    "change-mechanical/remove-file-code",
    "change-mechanical/remove-file-of-any-kind",
    "change-mechanical/remove-file-page-property",
    "change-mechanical/remove-file-page-type",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This family has a rung at every file kind the add family has one at.",
    },
  ],
} as const satisfies Domain
