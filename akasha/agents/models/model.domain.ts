import type { Domain } from "@akasha/domain-system/domain"

export const model = {
  id: "01a0535c-f2cf-7edc-8a2e-f495d1255183",
  pageTypeSlug: "domain",
  slug: "model",
  definition: "a model work can be put to",
  pluralSlug: "models",
  partSlugs: [
    "domain/model-gateway",
    "module/model-asking",
    "page-type/model-family",
    "page-type/model-test",
    "page-type/model-test-outcome",
  ],
} as const satisfies Domain
