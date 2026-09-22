import type { ChangeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.types.ts"

export const renameLocalVariable = {
  id: "01a07718-c9b5-7a1b-822f-308aef9ac22a",
  type: "page-type/change-mechanical-file-content",
  slug: "rename-local-variable",
  changeMode: "change-mode/change-mode-rename",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-code",
  definition: "the change spelling a local binding and its references anew in a file",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The offset handed in is named `spot` rather than `at`.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanicalFileContent
