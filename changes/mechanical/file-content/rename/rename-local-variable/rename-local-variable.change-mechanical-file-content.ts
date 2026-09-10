import type { ChangeMechanicalFileContent } from "../../change-mechanical-file-content.page-type.types.ts"

export const renameLocalVariable = {
  id: "01a07718-c9b5-7a1b-822f-308aef9ac22a",
  pageTypeSlug: "change-mechanical-file-content",
  type: "change-mechanical-file-content",
  slug: "rename-local-variable",
  changeMode: "change-mode-rename",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-code",
  definition: "the change spelling a local binding and its references anew in one file",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The offset handed in is named `spot` rather than `at`.",
    },
  ],
  changeKind: "change-mechanical",
} as const satisfies ChangeMechanicalFileContent
