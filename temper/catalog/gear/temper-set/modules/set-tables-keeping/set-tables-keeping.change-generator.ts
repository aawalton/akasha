import type { ChangeGenerator } from "akasha/change/generator/change-generator.page-type.types.ts"

export const setTablesKeeping = {
  id: "01a0da03-a0cd-797e-b485-2b88326e4044",
  type: "page-type/change-generator",
  slug: "set-tables-keeping",
  definition: "the set tables, written again from the set pages",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The set tables are written by a machine rather than by an author.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The set pages are the side the tables are read from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A hand edit to a set table is written over from the pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every page and body is read through the change rather than off the disk.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A table already with the body that would be written again is left alone.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here commits.",
    },
  ],
} as const satisfies ChangeGenerator
