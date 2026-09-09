import type { ChangeMechanicalFileContent } from "../../change-mechanical-file-content.page-type.ts"

export const renameExport = {
  id: "01a07718-c9b7-70da-a720-619f59483340",
  pageTypeSlug: "change-mechanical-file-content",
  slug: "rename-export",
  changeMode: "change-mode-rename",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-code",
  definition: "a name one body exports spelled anew across the paths a caller hands in",
  code: "ts",
  test: "ts",
  changeKind: "change-mechanical",
} as const satisfies ChangeMechanicalFileContent
