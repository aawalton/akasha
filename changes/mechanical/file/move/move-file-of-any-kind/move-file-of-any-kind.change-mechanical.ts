import type { ChangeMechanical } from "../../../change-mechanical.page-type.types.ts"

export const moveFileOfAnyKind = {
  id: "01a0820e-a259-7563-85dc-3e3730e22c06",
  pageTypeSlug: "change-mechanical",
  type: "change-mechanical",
  slug: "move-file-of-any-kind",
  changeMode: "change-mode-move",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file",
  definition: "one file moved to another path, through the change moving that kind of path",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A path under a page name is moved by the change moving the files beside it.",
    },
    {
      invariantKind: "departure",
      statement: "Every other TypeScript path is moved by the change judging the imports named.",
    },
    {
      invariantKind: "departure",
      statement: "Every other path is moved by the change moving the file alone.",
    },
    {
      invariantKind: "departure",
      statement: "The kind of path is read off the path the file is moved from.",
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
      statement: "A path under a page type name is moved by the change moving a page type.",
    },
    {
      invariantKind: "departure",
      statement: "A path under a page property name is moved by the change moving a page property.",
    },
  ],
  changeKind: "change-mechanical",
} as const satisfies ChangeMechanical
