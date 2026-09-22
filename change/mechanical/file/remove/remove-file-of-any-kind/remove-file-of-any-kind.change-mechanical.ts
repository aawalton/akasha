import type { ChangeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.types.ts"

export const removeFileOfAnyKind = {
  id: "01a08221-da77-7ee4-a3c3-f3e1be5655e3",
  type: "page-type/change-mechanical",
  slug: "remove-file-of-any-kind",
  changeMode: "change-mode/change-mode-remove",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file",
  definition: "a file taken away, through the change taking that kind of path away",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A path under a page name goes by the change taking the files beside it away.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every other TypeScript path goes by the change judging the imports named.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every other path goes by the change taking the file alone away.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here works out a body of its own.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a path for its kind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path under a page type name goes by the change taking a page type away.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A path under a page property name goes by the change taking a page property away.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanical
