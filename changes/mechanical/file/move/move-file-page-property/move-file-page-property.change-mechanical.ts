import type { ChangeMechanical } from "../../../change-mechanical.page-type.ts"

export const moveFilePageProperty = {
  id: "01a08225-2ced-7797-a5ee-3aba1a83c869",
  pageTypeSlug: "change-mechanical",
  slug: "move-file-page-property",
  changeModeSlug: "change-mode-move",
  changeTargetTypeSlug: "change-target-type/file",
  changeTargetSubtypeSlug: "change-target-subtype/file-page-property",
  definition: "one page property's own file carried to another path with the files beside it",
  code: "ts",
  test: "ts",
  runsChecks: false,
  readersOweReading: false,
  writerOwesReading: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The carry is worked out by the change this change reaches.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges the path handed in.",
    },
    {
      invariantKind: "gap",
      statement: "A manifest naming the carried file as a way in states the new path for that way.",
    },
  ],
} as const satisfies ChangeMechanical
