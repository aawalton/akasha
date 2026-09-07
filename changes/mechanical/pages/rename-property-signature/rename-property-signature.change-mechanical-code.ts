import type { ChangeMechanicalCode } from "../../code/change-mechanical-code.page-type.ts"

export const renamePropertySignature = {
  id: "01a07718-c9b6-74eb-b71b-e0d52b81f5b7",
  pageTypeSlug: "change-mechanical-code",
  slug: "rename-property-signature",
  changeModeSlug: "change-mode-rename",
  changeTargetTypeSlug: "change-target-type/code",
  definition: "one property a type declares spelled anew wherever the checker resolves to it",
  code: "ts",
  test: "ts",
  runsChecks: false,
  readersOweReading: false,
  writerOwesReading: false,
} as const satisfies ChangeMechanicalCode
