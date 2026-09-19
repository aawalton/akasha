import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const changeFreshness = {
  id: "01a04faa-e70a-757d-a665-8e7b7bcfd14d",
  type: "page-type/module",
  slug: "change-freshness",
  definition:
    "the rules with a change to the bodies its writer read and to the commit it was judged against",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A body is overwritten only where the body on disk is what the writer's reading names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An apply records that reading again from the body at HEAD before these rules run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A path an apply writes is held to the body at HEAD rather than to what its writer read.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A body is overwritten only where the body on disk is the body its writer read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A body is weighed by git's own object id rather than by when that body was last touched.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A body carried mechanically after being read still holds for the reader that body was carried for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A path the base has a body at whose body will not read counts as moved rather than as unchanged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path the base has nothing at and disk has nothing at has moved nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path a change creates is held to no body.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A path a machine generates is held neither to a reading nor to the commit a change names.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A path a machine generates carries no work of an agent's to be written over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Which paths a machine generates is read from the index rather than from the change.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A path no reading was recorded for is held to nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The commit a change states is taken by any name git resolves to one commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path read against one commit and changed by another is answered as moved.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A path that changed between two commits and will not read is taken as having changed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two bodies are one body where the bytes match and both bodies are there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A refusal over a body that moved closes in the same words whichever way that body moved.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every path whose body moved is named in one refusal rather than one refusal each.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The words a refusal about a body closes in are named here for every reader.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller telling one refusal from another reads the words from here.",
    },
  ],
} as const satisfies Module
