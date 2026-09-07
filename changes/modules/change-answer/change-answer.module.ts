import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const changeAnswer = {
  id: "01a07721-531c-732a-a072-2842893f0584",
  pageTypeSlug: "module",
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
      statement: "An edit stating no body takes its path away.",
    },
    {
      invariantKind: "departure",
      statement: "An edit naming a path that edit came from is a move.",
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
      statement: "An edit holding a body each side states the body that edit was worked out from.",
    },
    {
      invariantKind: "departure",
      statement: "Two edits to one path gather only where the later followed the earlier.",
    },
    {
      invariantKind: "departure",
      statement: "An edit stated a second time over gathers as the edit already there.",
    },
    {
      invariantKind: "departure",
      statement: "A move gathers with the write that move follows under the path left behind.",
    },
    {
      invariantKind: "departure",
      statement: "A move landing where another edit already answers is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A later edit to a path replaces an earlier edit to that path.",
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
      statement: "An add holds a path and the content that path is to hold.",
    },
    {
      invariantKind: "departure",
      statement: "A replace holds a path and the passage each side.",
    },
    {
      invariantKind: "departure",
      statement: "A remove holds a path alone.",
    },
    {
      invariantKind: "departure",
      statement: "A move holds the path moved from and the path moved to.",
    },
    {
      invariantKind: "departure",
      statement: "A whole body written over another is a replace holding the whole body each side.",
    },
    {
      invariantKind: "departure",
      statement: "The body such an edit is worked out from is read off the tree.",
    },
    {
      invariantKind: "departure",
      statement: "Such an edit is widened against the bodies the earlier edits left.",
    },
    {
      invariantKind: "departure",
      statement: "A path holding no characters holds no body.",
    },
    {
      invariantKind: "departure",
      statement: "An add onto a path holding a body is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A move onto a path holding a body is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A replace naming a passage its path holds twice is refused.",
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
      invariantKind: "departure",
      statement: "A move whose body changed narrows to a move and a replace.",
    },
    {
      invariantKind: "departure",
      statement: "A move stating no body narrows to a remove of the path moved from.",
    },
    {
      invariantKind: "departure",
      statement: "An edit worked out from no body narrows to an add or to no edit.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the disk or writes to the disk.",
    },
    {
      invariantKind: "gap",
      statement: "An answer holds edits of the four kinds alone.",
    },
  ],
} as const satisfies Module
