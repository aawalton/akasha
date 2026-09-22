import type { ChangeMechanicalFile } from "akasha/change/mechanical/file/change-mechanical-file.page-type.types.ts"

export const moveFile = {
  id: "01a07883-67ed-7849-b6e5-e499695cac46",
  type: "page-type/change-mechanical-file",
  slug: "move-file",
  changeMode: "change-mode/change-mode-move",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file",
  definition: "a file moved to another path, with nothing else judged",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A move lands as a path moved rather than a body written and a body taken away.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path with no body is refused rather than moved.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path a body already stands at is refused rather than written over.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here rewrites the paths the moved body names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The calling change repoints every body naming the path that moved.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanicalFile
