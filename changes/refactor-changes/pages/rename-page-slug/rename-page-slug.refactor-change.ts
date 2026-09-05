import type { RefactorChange } from "../../refactor-change.page-type.ts"

export const renamePageSlug = {
  id: "01a07388-e8bd-7e05-b76a-2cce52812b54",
  pageTypeSlug: "refactor-change",
  slug: "rename-page-slug",
  definition: "a page's slug renamed wherever it reaches, in the data, the export and the names",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The slug rename, the export rename and the path renames run in that order.",
    },
    {
      invariantKind: "departure",
      statement: "The slug carried now and the page type are read off the page's own body.",
    },
    {
      invariantKind: "departure",
      statement: "Each change reads the bodies the changes before it answered.",
    },
    {
      invariantKind: "departure",
      statement: "A file beside the page is found from the keys its body states, not by a listing.",
    },
    {
      invariantKind: "departure",
      statement: "A beside file lands under the new name with the ending its key's value states.",
    },
    {
      invariantKind: "departure",
      statement: "A file property whose file carries a fixed name does not follow the slug.",
    },
    {
      invariantKind: "departure",
      statement: "The page's own file is carried before the files beside it.",
    },
    {
      invariantKind: "departure",
      statement: "A body answered under a path that moved is dropped from under the old path.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal from a change this runs is answered as this change's own refusal.",
    },
    {
      invariantKind: "departure",
      statement: "A page type's slug is not renamed here.",
    },
    {
      invariantKind: "departure",
      statement: "The bodies and the paths that moved are answered rather than written.",
    },
    {
      invariantKind: "departure",
      statement: "A page exporting no name its slug makes carries no export for this to rename.",
    },
    {
      invariantKind: "gap",
      statement:
        "A page exporting the name its slug makes is refused, the export rename barring a page.",
    },
  ],
} as const satisfies RefactorChange
