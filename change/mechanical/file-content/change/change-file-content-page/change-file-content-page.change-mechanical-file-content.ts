import type { ChangeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.types.ts"

export const changeFileContentPage = {
  id: "01a0826b-01da-7957-9cdb-c75c20bffe8b",
  type: "page-type/change-mechanical-file-content",
  slug: "change-file-content-page",
  changeMode: "change-mode/change-mode-change",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-page",
  definition: "a passage of a page's body replaced, with what that page states judged",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The passage is worked by the change this change reaches.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The imports the body names after the change are judged by the change reached.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here judges the path a passage is worked at.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here works out a body of its own.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanicalFileContent
