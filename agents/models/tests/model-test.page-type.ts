import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const modelTest = {
  id: "01a053eb-6b23-7825-ab5f-2b95d3bd1e95",
  type: "page-type",
  slug: "model-test",
  definition: "a prompt and the labelled cases that say whether it works",
  pluralSlug: "model-tests",
  parts: [
    "model-test/directive-kept",
    "model-test/directives-kept",
    "model-test/restatement",
    "module/model-test-running",
    "page-property-entry/cases",
    "page-type/model-test-outcome",
    "text-property/case-against",
    "text-property/case-asked",
    "relation-property/model-family",
    "select-property/case-answer",
    "text-property/case-page",
    "text-property/case-statement",
    "text-property/prompt",
  ],
  extends: ["page-type/module"],
  properties: [
    { pageProperty: "relation-property/model-family", required: true, many: false },
    { pageProperty: "text-property/prompt", required: true, many: false },
    { pageProperty: "page-property-entry/cases", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A test's code puts its prompt together from the inputs the code is handed.",
    },
    {
      invariantKind: "departure",
      statement: "A test has no address for a model.",
    },
    {
      invariantKind: "departure",
      statement: "A case has its own text.",
    },
    {
      invariantKind: "departure",
      statement: "A test stating no cases is run against the cases of the test it rivals.",
    },
    {
      invariantKind: "departure",
      statement:
        "Two tests asking one question of one set of cases are weighed against each other.",
    },
    {
      invariantKind: "departure",
      statement:
        "A run that could not reach a model is a failure of its own rather than a case that passed.",
    },
    {
      invariantKind: "departure",
      statement: "A test's code picks what the code judges rather than the prompt saying so.",
    },
  ],
  types: "ts",
} as const satisfies PageType
