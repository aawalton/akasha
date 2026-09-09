import type { ChangeMechanicalFileContent } from "../../change-mechanical-file-content.page-type.ts"

export const renamePropertySignature = {
  id: "01a07718-c9b6-74eb-b71b-e0d52b81f5b7",
  pageTypeSlug: "change-mechanical-file-content",
  slug: "rename-property-signature",
  changeMode: "change-mode-rename",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-code",
  definition: "one property a type declares spelled anew wherever the checker resolves to it",
  code: "ts",
  test: "ts",
  changeKindSlug: "change-mechanical",
} as const satisfies ChangeMechanicalFileContent
