import type { ChangeMechanicalFileContent } from "akasha/changes/mechanical/file-content/change-mechanical-file-content.page-type.types.ts"

export const changeImports = {
  id: "01a07718-c9b6-7696-a9d0-77a8605d3a0b",
  type: "change-mechanical-file-content",
  slug: "change-imports",
  changeMode: "change-mode-rename",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-code",
  definition: "a body rewritten so the paths it names follow the files that moved",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here has a file.",
    },
    {
      invariantKind: "departure",
      statement: "The paths a body names are worked out by the module rather than here.",
    },
  ],
  changeKind: "change-mechanical",
} as const satisfies ChangeMechanicalFileContent
