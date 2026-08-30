import type { Domain } from "../../../domain-system/domain/domain.page-type.ts"
import type { PageType } from "../../../pages-system/page-type/page-type.page-type.ts"
import type { Cases } from "./properties/cases.file-property.ts"
import type { ModelFamilySlug } from "./properties/model-family-slug.relation-property.ts"
import type { Prompt } from "./properties/prompt.text-property.ts"

export type ModelTest = Domain & {
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
    "file-property/cases",
    "model-test/guess-it-first",
    "relation-property/model-family-slug",
    "text-property/prompt",
  ],
  extendsSlug: "page-type/domain",
  properties: [
    { pagePropertySlug: "model-family-slug", required: true, many: false },
    { pagePropertySlug: "prompt", required: true, many: false },
    { pagePropertySlug: "cases", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The text judged is appended to the prompt rather than filled into a hole in it.",
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
