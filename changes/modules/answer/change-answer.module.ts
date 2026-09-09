import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const changeAnswer = {
  id: "01a07721-531c-732a-a072-2842893f0584",
  pageTypeSlug: "module",
  type: "module",
  slug: "change-answer",
  definition: "the edits a change answers rather than writes",
  code: "ts",
  types: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "An argument a change was handed no value for is refused by the key naming that argument.",
    },
    {
      invariantKind: "departure",
      statement: "An edit states whether the readers of its path owe the reading again.",
    },
    {
      invariantKind: "departure",
      statement: "An edit stating nothing there leaves its readers owing the reading.",
    },
    {
      invariantKind: "departure",
      statement: "Edits gather by joining the edits in the order the edits were stated.",
    },
    {
      invariantKind: "departure",
      statement: "Gathering reconciles nothing, as an edit claims no body it does not name.",
    },
    {
      invariantKind: "departure",
      statement: "A move landing where another edit already answers is refused.",
    },
    {
      invariantKind: "departure",
      statement: "One refusal refuses the whole answer.",
    },
    {
      invariantKind: "departure",
      statement: "An edit holds only what making that edit takes.",
    },
    {
      invariantKind: "departure",
      statement: "An add has a path and the content that path is to hold.",
    },
    {
      invariantKind: "departure",
      statement: "A replace has a path and the passage each side.",
    },
    {
      invariantKind: "departure",
      statement: "A remove has a path alone.",
    },
    {
      invariantKind: "departure",
      statement: "A move has the path moved from and the path moved to.",
    },
    {
      invariantKind: "departure",
      statement: "A whole body written over another is a replace with the whole body each side.",
    },
    {
      invariantKind: "departure",
      statement: "A splice has the place a body changes and what that place is to hold.",
    },
    {
      invariantKind: "departure",
      statement: "A splice becomes a replace naming the whole lines that place sits in.",
    },
    {
      invariantKind: "departure",
      statement: "A run of lines the body has twice widens a line each side until it is held once.",
    },
    {
      invariantKind: "departure",
      statement: "A splice widens to the whole body where no run of lines around it is held once.",
    },
    {
      invariantKind: "departure",
      statement: "A splice leaving its place as the place was answers no edit.",
    },
    {
      invariantKind: "departure",
      statement: "Many splices are read in the order they sit in the body.",
    },
    {
      invariantKind: "departure",
      statement: "Two splices whose lines meet or overlap answer one edit over those lines.",
    },
    {
      invariantKind: "departure",
      statement:
        "Of two splices opening at one place, the one handed in later is dropped rather than joined.",
    },
    {
      invariantKind: "departure",
      statement: "Two splices whose lines are apart answer an edit each.",
    },
    {
      invariantKind: "departure",
      statement: "The body such an edit is worked out from is read off the tree.",
    },
    {
      invariantKind: "departure",
      statement: "Such an edit is worked out against the bodies the earlier edits left.",
    },
    {
      invariantKind: "departure",
      statement: "A path with no characters has no body.",
    },
    {
      invariantKind: "departure",
      statement: "A body that is not text is answered as not text rather than read as characters.",
    },
    {
      invariantKind: "departure",
      statement: "A move and a remove read whether a path holds a body rather than that body.",
    },
    {
      invariantKind: "departure",
      statement: "A passage worked in a body that is not text is refused.",
    },
    {
      invariantKind: "departure",
      statement: "An add onto a path with a body is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A move onto a path with a body is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A replace naming a passage its path has twice is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A replace naming a passage of no characters is refused.",
    },
    {
      invariantKind: "departure",
      statement: "An edit leaving the body unchanged narrows to no edit.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the disk or writes to the disk.",
    },
  ],
} as const satisfies Module
