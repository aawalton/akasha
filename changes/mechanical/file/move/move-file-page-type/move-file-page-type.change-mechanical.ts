import type { ChangeMechanical } from "../../../change-mechanical.page-type.ts"

export const moveFilePageType = {
  id: "01a08225-e6c6-7f47-9b38-c142c3e9ea41",
  pageTypeSlug: "change-mechanical",
  slug: "move-file-page-type",
  changeModeSlug: "change-mode-move",
  changeTargetTypeSlug: "change-target-type/file",
  changeTargetSubtypeSlug: "change-target-subtype/file-page-type",
  definition: "one page type's own file carried to another path with the files beside it",
  code: "ts",
  test: "ts",
  runsChecks: false,
  readersOweReading: false,
  writerOwesReading: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A path under no `page-type` name is refused here.",
    },
    {
      invariantKind: "departure",
      statement: "The page types a name is read against are the ones the world files.",
    },
    {
      invariantKind: "departure",
      statement: "The carry is worked out by the change this change reaches.",
    },
    {
      invariantKind: "absence",
      statement: "No page filed under the page type is carried here.",
    },
    {
      invariantKind: "gap",
      statement: "A manifest naming the carried file as a way in states the new path for that way.",
    },
  ],
} as const satisfies ChangeMechanical
