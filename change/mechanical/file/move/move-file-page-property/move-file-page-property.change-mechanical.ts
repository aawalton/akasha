import type { ChangeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.types.ts"

export const moveFilePageProperty = {
  id: "01a08225-2ced-7797-a5ee-3aba1a83c869",
  type: "page-type/change-mechanical",
  slug: "move-file-page-property",
  changeMode: "change-mode/change-mode-move",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file-page-property",
  definition: "a page property's own file moved to another path with the files beside it",
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
      decisionKind: "decision-kind/departure",
      statement: "A manifest naming the moved file as a way in is restated by the change reached.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
  createdAt: "2026-09-08T17:51:09.549Z",
  updatedAt: "2026-09-22T10:09:30.000Z",
} as const satisfies ChangeMechanical
