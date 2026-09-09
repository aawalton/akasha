import type { ChangeMechanical } from "../../../change-mechanical.page-type.ts"

export const moveFilePageType = {
  id: "01a08225-e6c6-7f47-9b38-c142c3e9ea41",
  pageTypeSlug: "change-mechanical",
  type: "change-mechanical",
  slug: "move-file-page-type",
  changeMode: "change-mode-move",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file-page-type",
  definition: "one page type's own file moved to another path with the files beside it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The move is worked out by the change this change reaches.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges the path handed in.",
    },
    {
      invariantKind: "absence",
      statement: "No page filed under the page type is moved here.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest naming the moved file as a way in is restated by the change reached.",
    },
  ],
  changeKind: "change-mechanical",
} as const satisfies ChangeMechanical
