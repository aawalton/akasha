import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const changeAnswer = {
  id: "01a07721-531c-732a-a072-2842893f0584",
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
      statement: "An argument a change does not take is refused by the key naming it.",
    },
    {
      invariantKind: "departure",
      statement: "That refusal names every argument the change does take.",
    },
    {
      invariantKind: "departure",
      statement: "That refusal points at the argument nearest the key, where one is near enough.",
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
      statement: "Gathering reconciles nothing.",
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
      statement: "An append has a path and the content that path is to end with.",
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
      statement: "A bring has a path alone.",
    },
    {
      invariantKind: "departure",
      statement: "The body a bring leaves is the body its path already holds.",
    },
    {
      invariantKind: "departure",
      statement: "A bring names no body, so a body of any bytes goes through a bring.",
    },
    {
      invariantKind: "departure",
      statement: "A bring at a path holding no body is refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "The path an edit leaves a body at is the path moved to for a move and the path named otherwise.",
    },
    {
      invariantKind: "departure",
      statement: "A whole body written over another is a replace with the whole body each side.",
    },
    {
      invariantKind: "departure",
      statement: "A splice has the place a body changes and the content that place is to hold.",
    },
    {
      invariantKind: "departure",
      statement: "A splice becomes a replace naming the whole lines that place sits in.",
    },
    {
      invariantKind: "departure",
      statement:
        "A run of lines the body has twice widens a line each side until the run is held once.",
    },
    {
      invariantKind: "departure",
      statement:
        "A splice widens to the whole body where no run of lines around that splice is held once.",
    },
    {
      invariantKind: "departure",
      statement: "A splice leaving its place as the place was answers no edit.",
    },
    {
      invariantKind: "departure",
      statement: "Many splices are read in the order the splices sit in the body.",
    },
    {
      invariantKind: "departure",
      statement: "Two splices whose lines meet or overlap answer one edit over those lines.",
    },
    {
      invariantKind: "departure",
      statement:
        "Of two splices opening at one place the splice handed in later is dropped rather than joined.",
    },
    {
      invariantKind: "departure",
      statement: "Two splices whose lines are apart answer two edits.",
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
      statement: "An append leaves the body its path holds and puts its content after that body.",
    },
    {
      invariantKind: "departure",
      statement: "An append onto a path with no body leaves that content alone.",
    },
    {
      invariantKind: "departure",
      statement: "An append of no characters is refused.",
    },
    {
      invariantKind: "departure",
      statement: "An append onto a body that is not text is refused.",
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
