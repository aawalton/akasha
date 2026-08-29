import type { Check } from "../check.page-type.ts"

export const witnessNotAsserted = {
  id: "01a04b5e-39e5-7dbf-a52f-44cb6748d8f0",
  pageTypeSlug: "check",
  slug: "witness-not-asserted",
  definition: "the check refusing a witness obtained by assertion",
  code: "ts",
  test: "ts",
  needs: "tree",
  requiredReadingSlugs: ["domain/akasha-type", "module/checking"],
  design: [
    "A witness type is found by the unexported unique symbol its module declares, never by a list kept beside it.",
    "Outside the module that declares it, a witness type is never the target of an assertion.",
    "A file that is not text is not judged here.",
  ],
} as const satisfies Check
