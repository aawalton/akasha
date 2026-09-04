import type { Module } from "@akasha/code-system/module"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Cases } from "./properties/cases.page-property-entry.ts"
import type { ModelFamilySlug } from "./properties/model-family-slug.relation-property.ts"
import type { Prompt } from "./properties/prompt.text-property.ts"

export type ModelTest = Module & {
  modelFamilySlug: ModelFamilySlug
  prompt: Prompt
  cases: Cases
}

export const modelTest = {
  id: "01a053eb-6b23-7825-ab5f-2b95d3bd1e95",
  pageTypeSlug: "page-type",
  slug: "model-test",
  definition: "a prompt and the labelled cases that say whether it works",
  pluralSlug: "model-tests",
  partSlugs: [
    "model-test/restatement",
    "page-property-entry/cases",
    "page-type/model-test-outcome",
    "relation-property/case-page",
    "relation-property/model-family-slug",
    "text-property/case-answer",
    "text-property/case-statement",
    "text-property/prompt",
  ],
  extendsSlug: ["page-type/module"],
  properties: [
    { pagePropertySlug: "model-family-slug", required: true, many: false },
    { pagePropertySlug: "prompt", required: true, many: false },
    { pagePropertySlug: "cases", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A test's code puts its prompt together from what the code is handed.",
    },
    {
      invariantKind: "departure",
      statement:
        "A test's code picks which pages the code judges rather than the prompt saying so.",
    },
    {
      invariantKind: "departure",
      statement: "A test carries no address for a model.",
    },
    {
      invariantKind: "departure",
      statement: "A case carries its own text.",
    },
    {
      invariantKind: "departure",
      statement:
        "A run that could not reach a model is a failure of its own rather than a case that passed.",
    },
  ],
} as const satisfies PageType
