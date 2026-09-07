import type { ChangeMechanicalCode } from "../../code/change-mechanical-code.page-type.ts"

export const renameExport = {
  id: "01a07718-c9b7-70da-a720-619f59483340",
  pageTypeSlug: "change-mechanical-code",
  slug: "rename-export",
  changeModeSlug: "change-mode-rename",
  definition: "a name one body exports spelled anew across the paths a caller hands in",
  code: "ts",
  test: "ts",
  runsChecks: false,
  readersOweReading: false,
  writerOwesReading: false,
} as const satisfies ChangeMechanicalCode
