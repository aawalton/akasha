import type { ChangeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.types.ts"

export const removeFilePageProperty = {
  id: "01a08226-93fb-7f34-b432-0c2c3a73fdea",
  type: "page-type/change-mechanical",
  slug: "remove-file-page-property",
  changeMode: "change-mode/change-mode-remove",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file-page-property",
  definition: "a page property taken away with every file that property keeps beside it",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The removal is worked out by the change this change reaches.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here judges the path handed in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No page has that key while the property goes.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanical
