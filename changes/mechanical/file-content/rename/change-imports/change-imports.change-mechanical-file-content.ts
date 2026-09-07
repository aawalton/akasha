import type { ChangeMechanicalFileContent } from "../../change-mechanical-file-content.page-type.ts"

export const changeImports = {
  id: "01a07718-c9b6-7696-a9d0-77a8605d3a0b",
  pageTypeSlug: "change-mechanical-file-content",
  slug: "change-imports",
  changeModeSlug: "change-mode-rename",
  changeTargetTypeSlug: "change-target-type/file-content",
  changeTargetSubtypeSlug: "change-target-subtype/code",
  definition: "a body rewritten so the paths it names follow the files that moved",
  code: "ts",
  test: "ts",
  runsChecks: false,
  readersOweReading: false,
  writerOwesReading: false,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A body names the generated declarations of that body by that body's folder and name.",
    },
    {
      invariantKind: "departure",
      statement:
        "A name carrying no leading dot lands against the folder of the body naming that name.",
    },
    {
      invariantKind: "departure",
      statement: "The paths that moved arrive as a plain object rather than as a map.",
    },
    {
      invariantKind: "departure",
      statement: "The specifier naming a path from a folder is worked out here for any caller.",
    },
  ],
} as const satisfies ChangeMechanicalFileContent
