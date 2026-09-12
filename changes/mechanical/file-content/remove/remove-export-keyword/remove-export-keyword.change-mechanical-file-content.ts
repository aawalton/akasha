import type { ChangeMechanicalFileContent } from "akasha/changes/mechanical/file-content/change-mechanical-file-content.page-type.types.ts"

export const removeExportKeyword = {
  id: "01a095d4-453f-7914-9ca6-98aa8d8c4097",
  type: "change-mechanical-file-content",
  slug: "remove-export-keyword",
  changeMode: "change-mode-remove",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-code",
  definition: "the change dropping the `export` from named values one code file declares",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The names to drop the `export` from are handed in rather than worked out here.",
    },
    {
      invariantKind: "departure",
      statement: "A statement declaring a name not handed in keeps its `export`.",
    },
    {
      invariantKind: "departure",
      statement: "A name this change did not reach is refused rather than passed over.",
    },
    {
      invariantKind: "departure",
      statement: "The space after the keyword goes with the keyword.",
    },
  ],
  changeKind: "change-mechanical",
} as const satisfies ChangeMechanicalFileContent
