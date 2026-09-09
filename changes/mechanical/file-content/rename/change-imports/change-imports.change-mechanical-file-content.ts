import type { ChangeMechanicalFileContent } from "../../change-mechanical-file-content.page-type.ts"

export const changeImports = {
  id: "01a07718-c9b6-7696-a9d0-77a8605d3a0b",
  pageTypeSlug: "change-mechanical-file-content",
  slug: "change-imports",
  changeMode: "change-mode-rename",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-code",
  definition: "a body rewritten so the paths it names follow the files that moved",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A body names the generated declarations of that body by that body's folder and name.",
    },
    {
      invariantKind: "departure",
      statement:
        "A name with no leading dot lands against the folder of the body naming that name.",
    },
    {
      invariantKind: "departure",
      statement: "The paths that moved arrive as a plain object rather than as a map.",
    },
    {
      invariantKind: "departure",
      statement: "The body is read from the path that body sits at once the caller has carried it.",
    },
    {
      invariantKind: "departure",
      statement: "A body that is not text names no path, so nothing in it is repointed.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here has a file.",
    },
  ],
  changeKindSlug: "change-mechanical",
} as const satisfies ChangeMechanicalFileContent
