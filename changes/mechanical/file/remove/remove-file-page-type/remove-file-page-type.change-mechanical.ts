import type { ChangeMechanical } from "../../../change-mechanical.page-type.ts"

export const removeFilePageType = {
  id: "01a0821c-f3eb-7546-bbf0-34de118159a5",
  pageTypeSlug: "change-mechanical",
  slug: "remove-file-page-type",
  changeModeSlug: "change-mode-remove",
  changeTargetTypeSlug: "change-target-type/file",
  changeTargetSubtypeSlug: "change-target-subtype/file-page-type",
  definition: "one page type taken away with every file that page type keeps beside it",
  code: "ts",
  test: "ts",
  runsChecks: false,
  readersOweReading: false,
  writerOwesReading: false,
  guardSlugs: ["change-guard/page-type-carries-no-pages"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every file the page type keeps beside it goes by the change this change reaches.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges the path handed in.",
    },
    {
      invariantKind: "departure",
      statement: "The pages filed under the page type are judged by the guard this change names.",
    },
  ],
} as const satisfies ChangeMechanical
