import type { ChangeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.types.ts"

export const renameExport = {
  id: "01a07718-c9b7-70da-a720-619f59483340",
  type: "page-type/change-mechanical-file-content",
  slug: "rename-export",
  changeMode: "change-mode/change-mode-rename",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-code",
  definition: "a name a body exports spelled anew across the paths a caller hands in",
  code: "ts",
  test: "ts",
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanicalFileContent
