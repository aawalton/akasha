import type { ChangeMechanical } from "../../../change-mechanical.page-type.ts"

export const removeFileOfAnyKind = {
  id: "01a08221-da77-7ee4-a3c3-f3e1be5655e3",
  pageTypeSlug: "change-mechanical",
  slug: "remove-file-of-any-kind",
  changeModeSlug: "change-mode-remove",
  changeTargetTypeSlug: "change-target-type/file",
  changeTargetSubtypeSlug: "change-target-subtype/file",
  definition: "one file taken away, through the change taking that kind of path away",
  code: "ts",
  test: "ts",
  runsChecks: false,
  readersOweReading: false,
  writerOwesReading: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A path under a page name goes by the change taking the files beside it away.",
    },
    {
      invariantKind: "departure",
      statement: "Every other TypeScript path goes by the change judging the imports named.",
    },
    {
      invariantKind: "departure",
      statement: "Every other path goes by the change taking the file alone away.",
    },
    {
      invariantKind: "departure",
      statement: "The page types a name is read against are the ones the world files.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out a body of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A path under a page type name goes by the change taking a page type away.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path under a page property name goes by the change taking a page property away.",
    },
  ],
} as const satisfies ChangeMechanical
