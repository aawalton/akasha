import type { ChangeMechanical } from "../../../change-mechanical.page-type.ts"

export const moveFileOfAnyKind = {
  id: "01a0820e-a259-7563-85dc-3e3730e22c06",
  pageTypeSlug: "change-mechanical",
  slug: "move-file-of-any-kind",
  changeModeSlug: "change-mode-move",
  changeTargetTypeSlug: "change-target-type/file",
  changeTargetSubtypeSlug: "change-target-subtype/file",
  definition: "one file carried to another path, through the change carrying that kind of path",
  code: "ts",
  test: "ts",
  runsChecks: false,
  readersOweReading: false,
  writerOwesReading: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A path under a page name is carried by the change carrying the files beside it.",
    },
    {
      invariantKind: "departure",
      statement: "Every other TypeScript path is carried by the change judging the imports named.",
    },
    {
      invariantKind: "departure",
      statement: "Every other path is carried by the change carrying the file alone.",
    },
    {
      invariantKind: "departure",
      statement: "The kind of path is read off the path the file is carried from.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out a body of its own.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a path for its kind.",
    },
    {
      invariantKind: "departure",
      statement: "A path under a page type name is carried by the change carrying a page type.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path under a page property name is carried by the change carrying a page property.",
    },
  ],
} as const satisfies ChangeMechanical
