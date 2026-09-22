import type { ChangeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.types.ts"

export const moveFilePageType = {
  id: "01a08225-e6c6-7f47-9b38-c142c3e9ea41",
  type: "page-type/change-mechanical",
  slug: "move-file-page-type",
  changeMode: "change-mode/change-mode-move",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file-page-type",
  definition: "a page type's own file moved to another path with the files beside it",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The move is worked out by the change this change reaches.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here judges the path handed in.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No page filed under the page type is moved here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A manifest naming the moved file as a way in is restated by the change reached.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanical
