import type { ChangeMechanical } from "akasha/changes/mechanical/change-mechanical.page-type.types.ts"

export const moveFileOfAnyKind = {
  id: "01a0820e-a259-7563-85dc-3e3730e22c06",
  type: "change-mechanical",
  slug: "move-file-of-any-kind",
  changeMode: "change-mode/change-mode-move",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file",
  definition: "one file moved to another path, through the change moving that kind of path",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path under a page name is moved by the change moving the files beside it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every other TypeScript path is moved by the change judging the imports named.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every other path is moved by the change moving the file alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The kind of path is read off the path the file is moved from.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here works out a body of its own.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a path for its kind.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path under a page type name is moved by the change moving a page type.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path under a page property name is moved by the change moving a page property.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanical
