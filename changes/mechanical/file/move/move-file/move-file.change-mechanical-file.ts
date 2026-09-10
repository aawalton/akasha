import type { ChangeMechanicalFile } from "../../change-mechanical-file.page-type.types.ts"

export const moveFile = {
  id: "01a07883-67ed-7849-b6e5-e499695cac46",
  pageTypeSlug: "change-mechanical-file",
  type: "change-mechanical-file",
  slug: "move-file",
  changeMode: "change-mode-move",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file",
  definition: "one file moved to another path, with nothing else judged",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A move lands as a path moved rather than a body written and a body taken away.",
    },
    {
      invariantKind: "departure",
      statement: "A path with no body is refused rather than moved.",
    },
    {
      invariantKind: "departure",
      statement: "A path a body already stands at is refused rather than written over.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here rewrites the paths the moved body names.",
    },
    {
      invariantKind: "departure",
      statement: "The calling change repoints every body naming the path that moved.",
    },
  ],
  changeKind: "change-mechanical",
} as const satisfies ChangeMechanicalFile
