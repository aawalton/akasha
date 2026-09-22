import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const whereTesting = {
  id: "01a05bdd-d54c-7989-aac7-52cb42d778c4",
  type: "page-type/module",
  slug: "where-testing",
  definition: "the tests a `where` states, run over a value, and how two values order",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A test is run by the name a `where` states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The names a `where` may state are named here and nowhere else.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A `where` stating a name no test is run by is refused rather than dropped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every test a `where` states on one key holds before that key narrows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every key a `where` names narrows before a value is kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A `where` stating nothing keeps every value.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name naming no test answers false.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value with nothing is taken as bare.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A list with nothing is taken as bare.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An ordering test answers false over a value taken as bare.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two values order as numbers where both values are numbers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two values order as instants where both values parse as an instant.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two values order as text otherwise.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sort weighs text by the locale's order.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches the store.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here knows a query's parts but its `where`.",
    },
  ],
} as const satisfies Module
