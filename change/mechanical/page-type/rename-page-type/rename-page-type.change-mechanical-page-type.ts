import type { ChangeMechanicalPageType } from "akasha/change/mechanical/page-type/change-mechanical-page-type.page-type.types.ts"

export const renamePageType = {
  id: "01a0920d-ff8b-71c9-9d19-5de0bfe7f1c1",
  type: "change-mechanical-page-type",
  slug: "rename-page-type",
  changeMode: "change-mode/change-mode-rename",
  changeTargetType: "change-target-type/page-type",
  changeTargetSubtype: "change-target-subtype/page-type-page",
  definition: "a page type renamed, in its own name and in every page filed under that page type",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The old slug is read from the page type's own file name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path naming no page type is refused here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The pages of that page type are read from the index in one call.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every page and every file a page claims is moved in this one answer.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The page type's own file and every file it claims move in that same answer.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The files a page claims are read while the page type still declares them.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The page type a page states is restated at the path that page landed at.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page stating its page type under both keys has both keys restated.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every page's address is restated over one reading of the bodies.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The page type's own address is restated beside the addresses of its pages.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That restating comes before any file a page claims is moved.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The pages are carried before the page type's own file is renamed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The slug the page type states is restated in the body that page type landed in.",
    },

    {
      invariantKind: "invariant-kind/departure",
      statement: "The name the page type's own body exports is spelled from the new slug.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The type a page type's worked file exports is spelled from the new slug.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The type a page type's types file exports is spelled from the new slug.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body importing a type spelled anew imports the type the new slug names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every body importing what moved is repointed over one map of what moved.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body that moved names its own imports by the paths its new name reaches.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A manifest naming a file that moved as a way in states where that file landed.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No rung beneath is reached.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "The folder a page type owns is left where that folder sits.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanicalPageType
