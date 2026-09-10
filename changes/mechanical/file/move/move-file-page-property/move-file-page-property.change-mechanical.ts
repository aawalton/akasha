import type { ChangeMechanical } from "../../../change-mechanical.page-type.types.ts"

export const moveFilePageProperty = {
  id: "01a08225-2ced-7797-a5ee-3aba1a83c869",
  pageTypeSlug: "change-mechanical",
  type: "change-mechanical",
  slug: "move-file-page-property",
  changeMode: "change-mode-move",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file-page-property",
  definition: "one page property's own file moved to another path with the files beside it",
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
      invariantKind: "departure",
      statement: "A manifest naming the moved file as a way in is restated by the change reached.",
    },
  ],
  changeKind: "change-mechanical",
} as const satisfies ChangeMechanical
