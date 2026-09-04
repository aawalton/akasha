import type { Domain } from "@akasha/domain-system/domain"
import type { PageType } from "@akasha/pages-system/page-type"

export type ModelTestOutcome = Domain

export const modelTestOutcome = {
  id: "01a05905-af36-7e9e-b4a3-99f20936dd14",
  pageTypeSlug: "page-type",
  slug: "model-test-outcome",
  definition: "what a review found a model test's answer to be",
  pluralSlug: "model-test-outcomes",
  partSlugs: [
    "model-test-outcome/negative-false",
    "model-test-outcome/negative-true",
    "model-test-outcome/positive-false",
    "model-test-outcome/positive-true",
    "model-test-outcome/positive-truthy",
  ],
  extendsSlug: "page-type/domain",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A case bad in a way the test does not measure is not a false positive.",
    },
    {
      invariantKind: "departure",
      statement: "Only a case that is not bad in any way makes a positive false.",
    },
    {
      invariantKind: "departure",
      statement: "An outcome is what a reader found rather than what the model answered.",
    },
  ],
} as const satisfies PageType
