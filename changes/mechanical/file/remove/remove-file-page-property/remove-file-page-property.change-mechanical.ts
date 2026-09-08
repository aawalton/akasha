import type { ChangeMechanical } from "../../../change-mechanical.page-type.ts"

export const removeFilePageProperty = {
  id: "01a08226-93fb-7f34-b432-0c2c3a73fdea",
  pageTypeSlug: "change-mechanical",
  slug: "remove-file-page-property",
  changeModeSlug: "change-mode-remove",
  changeTargetTypeSlug: "change-target-type/file",
  changeTargetSubtypeSlug: "change-target-subtype/file-page-property",
  definition: "one page property taken away with every file that property keeps beside it",
  code: "ts",
  test: "ts",
  runsChecks: false,
  readersOweReading: false,
  writerOwesReading: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A path that is no page property is refused here.",
    },
    {
      invariantKind: "departure",
      statement: "The property types a name is read against are the ones under `page-property`.",
    },
    {
      invariantKind: "departure",
      statement: "The removal is worked out by the change this change reaches.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page type still declaring the property is refused by a guard that change names.",
    },
    {
      invariantKind: "gap",
      statement: "A page still carrying the key the property declares refuses the removal.",
    },
  ],
} as const satisfies ChangeMechanical
