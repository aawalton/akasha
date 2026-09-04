import type { Domain } from "@akasha/domains/domain"

export const model = {
  id: "01a0535c-f2cf-7edc-8a2e-f495d1255183",
  pageTypeSlug: "domain",
  slug: "model",
  definition: "a model work can be put to",
  pluralSlug: "models",
  partSlugs: [
    "domain/model-gateway",
    "module/model-asking",
    "module/model-vocab",
    "page-type/model-family",
    "page-type/model-test",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A model is a domain whose subject is one trained network.",
    },
  ],
} as const satisfies Domain
