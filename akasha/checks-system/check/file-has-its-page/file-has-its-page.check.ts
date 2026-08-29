import type { Check } from "../check.page-type.ts"

export const fileHasItsPage = {
  id: "01a04b6b-f0a0-7a21-a636-1f305035630d",
  pageTypeSlug: "check",
  slug: "file-has-its-page",
  definition: "the check refusing a file no page claims as its own or as one of its properties'",
  code: "ts",
  test: "ts",
  needs: "tree",
  requiredReadingSlugs: ["domain/akasha-file", "module/page-claims", "module/checking"],
  design: [
    "A file is claimed by being a page or by being named in one, never by sitting where a page is.",
    "A corpus the change would refuse is answered for as one finding, because nothing was judged.",
  ],
} as const satisfies Check
