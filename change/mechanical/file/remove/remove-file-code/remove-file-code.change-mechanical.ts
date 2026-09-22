import type { ChangeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.types.ts"

export const removeFileCode = {
  id: "01a07987-afc1-73bf-8a8e-9ba1cc6c5248",
  type: "page-type/change-mechanical",
  slug: "remove-file-code",
  changeMode: "change-mode/change-mode-remove",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file-code",
  definition: "a code file taken away, with the imports naming that file judged",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The file is taken away by the change this change reaches.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here judges the path a file is taken away from.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanical
