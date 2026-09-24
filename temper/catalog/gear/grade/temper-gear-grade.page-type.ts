import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperGearGrade = {
  id: "01a0d3e3-15fd-7894-84c4-490fc66d1590",
  type: "page-type/page-type",
  slug: "temper-gear-grade",
  definition: "what a piece of gear's enchant or trait is worth at one quality",
  pluralSlug: "grades",
  extends: ["page-type/temper-gear-thing"],
  parts: ["relation-property/grade-metric", "relation-property/graded-thing"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "relation-property/graded-thing", required: true, many: false },
    { pageProperty: "relation-property/quality", required: true, many: false },
    { pageProperty: "relation-property/grade-metric", required: false, many: false },
    { pageProperty: "number-property/quality-value", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A grade is one thing at one quality moving one metric.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A thing worth two numbers at one quality has two grades there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A grade of a thing whose worth reaches no metric names none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A grade sits under the thing it grades.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A grade's slug opens with the kind of thing graded, since one trait name recurs.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
