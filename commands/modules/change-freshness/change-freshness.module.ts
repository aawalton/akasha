import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const changeFreshness = {
  id: "01a04faa-e70a-757d-a665-8e7b7bcfd14d",
  pageTypeSlug: "module",
  type: "module",
  slug: "change-freshness",
  definition:
    "the rules with a change to the bodies its writer read and to the commit it was judged against",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A body is overwritten only where the body on disk is the body its writer read.",
    },
    {
      invariantKind: "departure",
      statement:
        "A body is weighed by git's own object id rather than by when that body was last touched.",
    },
    {
      invariantKind: "departure",
      statement:
        "A body carried mechanically after being read still holds for the reader that body was carried for.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path the base has a body at whose body will not read counts as moved rather than as unchanged.",
    },
    {
      invariantKind: "departure",
      statement: "A path the base has nothing at and disk has nothing at has moved nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A path a change creates is held to no body.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path a group writes is held neither to a reading nor to the commit a change names.",
    },
    {
      invariantKind: "absence",
      statement: "A path a group writes carries no work of an agent's to be written over.",
    },
    {
      invariantKind: "departure",
      statement: "Which paths a group writes is read from the index rather than from the change.",
    },
    {
      invariantKind: "absence",
      statement: "A path no reading was recorded for is held to nothing.",
    },
    {
      invariantKind: "departure",
      statement: "The commit a change states is taken by any name git resolves to one commit.",
    },
    {
      invariantKind: "departure",
      statement: "A path read against one commit and changed by another is answered as moved.",
    },
    {
      invariantKind: "departure",
      statement: "A commit reaching nothing this repository holds can change no verdict.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path that changed between two commits and will not read is taken as having changed.",
    },
    {
      invariantKind: "departure",
      statement: "Two bodies are one body where the bytes match and both bodies are there.",
    },
    {
      invariantKind: "departure",
      statement:
        "A refusal over a body that moved closes in the same words whichever way that body moved.",
    },
  ],
} as const satisfies Module
