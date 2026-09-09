import type { ChangeMechanical } from "../../../change-mechanical.page-type.ts"

export const removeFileOfAnyKind = {
  id: "01a08221-da77-7ee4-a3c3-f3e1be5655e3",
  pageTypeSlug: "change-mechanical",
  slug: "remove-file-of-any-kind",
  changeMode: "change-mode-remove",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file",
  definition: "one file taken away, through the change taking that kind of path away",
  code: "ts",
  test: "ts",
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
      invariantKind: "absence",
      statement: "Nothing here works out a body of its own.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a path for its kind.",
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
  changeKind: "change-mechanical",
} as const satisfies ChangeMechanical
