import type { Domain } from "@akasha/domain-system/domain"

export const models = {
  id: "01a0535c-f2cf-7edc-8a2e-f495d1255183",
  pageTypeSlug: "domain",
  slug: "models",
  definition: "the models work can be put to",
  partSlugs: [
    "domain/model-gateway",
    "module/model-asking",
    "page-type/model-family",
    "page-type/model-test",
    "page-type/model-test-outcome",
  ],
} as const satisfies Domain
