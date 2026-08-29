import type { Check } from "../check.page-type.ts"

export const noEnumOrNamespace = {
  id: "01a04b6b-ae61-7c5e-bb85-6e1f5105116c",
  pageTypeSlug: "check",
  slug: "no-enum-or-namespace",
  definition: "the check refusing an enum or a named namespace",
  code: "ts",
  test: "ts",
  needs: "file",
  requiredReadingSlugs: ["domain/akasha-code", "domain/akasha-type", "module/checking"],
  design: [
    "A module named by a string is a declaration about a package rather than a namespace, and is not judged.",
    "`declare global` is left alone, because it names no namespace of its own.",
    "An enum and a namespace are one check, because both are a runtime value a type alone would have carried.",
  ],
} as const satisfies Check
