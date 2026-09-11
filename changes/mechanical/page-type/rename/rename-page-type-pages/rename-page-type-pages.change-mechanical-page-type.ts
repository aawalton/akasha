import type { ChangeMechanicalPageType } from "akasha/changes/mechanical/page-type/change-mechanical-page-type.page-type.types.ts"

export const renamePageTypePages = {
  id: "01a0920d-ff8b-71c9-9d19-5de0bfe7f1c1",
  type: "change-mechanical-page-type",
  slug: "rename-page-type-pages",
  changeMode: "change-mode-rename",
  changeTargetType: "change-target-type/page-type",
  changeTargetSubtype: "change-target-subtype/page-type-page",
  definition: "every page of one page type carried to the new slug in one answer",
  code: "ts",
  test: "ts",
  guards: ["change-guard/claimed-file-not-left-behind"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The old slug is read from the page type's own file name.",
    },
    {
      invariantKind: "departure",
      statement: "A path naming no page type is refused here.",
    },
    {
      invariantKind: "departure",
      statement: "The pages of that page type are read from the index in one call.",
    },
    {
      invariantKind: "departure",
      statement: "Every page and every file a page claims is moved in this one answer.",
    },
    {
      invariantKind: "departure",
      statement: "The page type a page states is restated at the path that page landed at.",
    },
    {
      invariantKind: "departure",
      statement: "A page stating its page type under both keys has both keys restated.",
    },
    {
      invariantKind: "departure",
      statement: "Every body importing what moved is repointed over one map of what moved.",
    },
    {
      invariantKind: "departure",
      statement: "A body that moved names its own imports by the paths its new name reaches.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest naming a file that moved as a way in states where that file landed.",
    },
    {
      invariantKind: "departure",
      statement: "A file the rename leaves behind is refused by the guard named here.",
    },
    {
      invariantKind: "absence",
      statement: "The page type's own file is carried by another change.",
    },
    {
      invariantKind: "absence",
      statement: "No rung beneath is reached once for each page.",
    },
  ],
  changeKind: "change-mechanical",
} as const satisfies ChangeMechanicalPageType
