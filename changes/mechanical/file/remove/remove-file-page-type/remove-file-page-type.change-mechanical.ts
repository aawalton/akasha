import type { ChangeMechanical } from "../../../change-mechanical.page-type.ts"

export const removeFilePageType = {
  id: "01a0821c-f3eb-7546-bbf0-34de118159a5",
  pageTypeSlug: "change-mechanical",
  slug: "remove-file-page-type",
  changeMode: "change-mode-remove",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file-page-type",
  definition: "one page type taken away with every file that page type keeps beside it",
  code: "ts",
  test: "ts",
  guards: ["change-guard/page-type-carries-no-pages"],
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
  changeKind: "change-mechanical",
} as const satisfies ChangeMechanical
