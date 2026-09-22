import type { ChangeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.types.ts"

export const addFilePageProperty = {
  id: "01a07984-2e7e-7ced-801b-160efbf7e220",
  type: "page-type/change-mechanical",
  slug: "add-file-page-property",
  changeMode: "change-mode/change-mode-add",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file-page-property",
  definition: "a page property written at a path, with the keys that property carries judged",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The body is written by the change this change reaches.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here judges the path handed in.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The pages the body names are judged by the change this change reaches.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanical
