import type { ChangeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.types.ts"

export const changeFileContentOfAnyKind = {
  id: "01a0826c-1190-79a9-aa7d-6eaf11dec403",
  type: "page-type/change-mechanical-file-content",
  slug: "change-file-content-of-any-kind",
  changeMode: "change-mode/change-mode-change",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content",
  definition: "a passage of a body replaced, through the change working that kind of body",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A path under a page name is worked by the change judging what that page states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every other TypeScript path is worked by the change judging the imports named.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every other path is worked by the change judging nothing beyond the passage.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a path for its kind.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here works out a body of its own.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanicalFileContent
