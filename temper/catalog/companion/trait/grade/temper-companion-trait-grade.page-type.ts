import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperCompanionTraitGrade = {
  id: "01a0d3e2-b138-7ae3-a092-02aca2555e4f",
  type: "page-type/page-type",
  slug: "temper-companion-trait-grade",
  definition: "what a companion trait is worth at one quality",
  pluralSlug: "grades",
  extends: ["page-type/temper-companion-thing"],
  parts: ["relation-property/companion-grade-metric", "relation-property/graded-companion-trait"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "relation-property/graded-companion-trait", required: true, many: false },
    { pageProperty: "relation-property/quality", required: true, many: false },
    { pageProperty: "relation-property/companion-grade-metric", required: true, many: false },
    { pageProperty: "number-property/quality-value", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A grade is one trait at one quality moving one companion metric.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A grade sits under the trait it grades.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
