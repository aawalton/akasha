import type { Check } from "../check.page-type.ts"

export const relationResolves = {
  id: "01a04b5e-39e5-78e2-bb42-cc67ff6882a1",
  pageTypeSlug: "check",
  slug: "relation-resolves",
  definition: "the check refusing a relation that names no page, or a page of a type it may not name",
  code: "ts",
  test: "ts",
  needs: "tree",
  requiredReadingSlugs: [
    "domain/akasha-page-edge",
    "page-property-type/target-page-type-slug",
    "module/corpus",
    "module/checking",
  ],
  design: [
    "A relation check walks `extendsSlug`.",
    "The type carries which page type a relation may name; whether that page exists is a different claim, answered here.",
    "A corpus the change would refuse outright is one finding, not none.",
  ],
} as const satisfies Check
