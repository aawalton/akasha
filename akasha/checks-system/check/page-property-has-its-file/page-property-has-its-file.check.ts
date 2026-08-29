import type { Check } from "../check.page-type.ts"

export const pagePropertyHasItsFile = {
  id: "01a04b6b-f0a0-7b60-8c6c-338a1477455e",
  pageTypeSlug: "check",
  slug: "page-property-has-its-file",
  definition: "the check refusing a page stating a property held in a file that is missing or empty",
  code: "ts",
  test: "ts",
  needs: "tree",
  requiredReadingSlugs: ["domain/akasha-file", "module/page-claims", "module/checking"],
  design: [
    "A page stating a property and holding nothing states nothing, so an empty file is as missing as none.",
    "The finding is kept against the page that made the claim, never against the file that is absent.",
  ],
} as const satisfies Check
