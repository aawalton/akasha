import type { Check } from "../check.page-type.ts"

export const typecheck = {
  id: "01a04b5e-39e5-7e32-b558-16df50a2305c",
  pageTypeSlug: "check",
  slug: "typecheck",
  definition: "the check refusing TypeScript that does not compile",
  code: "ts",
  test: "ts",
  needs: "tree",
  requiredReadingSlugs: ["domain/akasha-check", "domain/akasha-code", "module/checking"],
  design: [
    "The settings the compiler runs under are stated here, because a file stating them would be neither a page nor a page property's file.",
    "A file under the root is read as the change would leave it; everything else is read from disk, so packages and the standard library still answer.",
    "A diagnostic away from any file is kept against the root.",
  ],
} as const satisfies Check
