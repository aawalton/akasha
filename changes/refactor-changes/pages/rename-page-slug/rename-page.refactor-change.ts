import type { RefactorChange } from "../../refactor-change.page-type.ts"

export const renamePage = {
  id: "01a07388-e8bd-7e05-b76a-2cce52812b54",
  pageTypeSlug: "refactor-change",
  slug: "rename-page",
  definition: "a page renamed and carried to where its slug says, in the data and in every name",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The slug rename and the path renames run in that order.",
    },
    {
      invariantKind: "departure",
      statement: "The exported const is renamed by the slug rename rather than by a step here.",
    },
    {
      invariantKind: "departure",
      statement: "The plural is handed down to the slug rename rather than worked out here.",
    },
    {
      invariantKind: "departure",
      statement: "The slug carried now and the page type are read off the page's own body.",
    },
    {
      invariantKind: "departure",
      statement: "Each change reads the bodies the changes before that change answered.",
    },
    {
      invariantKind: "departure",
      statement: "A file beside the page is found from the keys the page's body states.",
    },
    {
      invariantKind: "absence",
      statement: "No file beside the page is found by listing the folder.",
    },
    {
      invariantKind: "departure",
      statement: "A beside file lands under the new name with the ending its key's value states.",
    },
    {
      invariantKind: "departure",
      statement: "A page alone in its folder lands in the folder its slug names.",
    },
    {
      invariantKind: "departure",
      statement: "Which files sit in a folder is asked of the index.",
    },
    {
      invariantKind: "departure",
      statement: "A page sharing its folder keeps that folder.",
    },
    {
      invariantKind: "departure",
      statement: "A page with no file beside the page keeps its folder.",
    },
    {
      invariantKind: "departure",
      statement: "A folder's name drops the opening its plural or its page type already says.",
    },
    {
      invariantKind: "departure",
      statement: "A page asked for the slug that page carries has the slug restated by nothing.",
    },
    {
      invariantKind: "departure",
      statement: "Such a page has its files carried all the same.",
    },
    {
      invariantKind: "departure",
      statement: "A change restating no slug and moving no file refuses.",
    },
    {
      invariantKind: "departure",
      statement: "A plural asked of a page carrying the slug asked for refuses the change.",
    },
    {
      invariantKind: "departure",
      statement: "A file property whose file carries a fixed name does not follow the slug.",
    },
    {
      invariantKind: "departure",
      statement: "The page's own file is carried before the files beside that file.",
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
  ],
} as const satisfies RefactorChange
