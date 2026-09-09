import type { Module } from "@akasha/code/module"
import type { PageType } from "@akasha/pages/page-type"
import type { Cases } from "./properties/cases.page-property-entry.ts"
import type { ModelFamily } from "./properties/model-family.relation-property.ts"
import type { Prompt } from "./properties/prompt.text-property.ts"

export type ModelTest = Module & {
  modelFamily: ModelFamily
  prompt: Prompt
  cases: Cases
}

export const modelTest = {
  id: "01a053eb-6b23-7825-ab5f-2b95d3bd1e95",
  pageTypeSlug: "page-type",
  slug: "model-test",
  definition: "a prompt and the labelled cases that say whether it works",
  pluralSlug: "model-tests",
  parts: [
    "model-test/restatement",
    "page-property-entry/cases",
    "page-type/model-test-outcome",
    "relation-property/case-page",
    "relation-property/model-family",
    "text-property/case-answer",
    "text-property/case-statement",
    "text-property/prompt",
  ],
  extends: ["page-type/module"],
  properties: [
    { pagePropertySlug: "relation-property/model-family", required: true, many: false },
    { pagePropertySlug: "text-property/prompt", required: true, many: false },
    { pagePropertySlug: "page-property-entry/cases", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A test's code puts its prompt together from the inputs the code is handed.",
    },
    {
      invariantKind: "departure",
      statement:
        "A test's code picks which pages the code judges rather than the prompt saying so.",
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
      statement:
        "A run that could not reach a model is a failure of its own rather than a case that passed.",
    },
  ],
} as const satisfies PageType
