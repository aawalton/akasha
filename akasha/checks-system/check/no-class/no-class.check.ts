import type { Check } from "../check.page-type.ts"

export const noClass = {
  id: "01a04b6b-ae58-7b83-9952-7cff31ddccd7",
  pageTypeSlug: "check",
  slug: "no-class",
  definition: "the check refusing a class that is not an error type",
  code: "ts",
  test: "ts",
  needs: "file",
  requiredReadingSlugs: ["domain/akasha-code", "domain/akasha-functional-core", "module/checking"],
  design: [
    "A class extending `Error` is let through, because the language gives no other way to make a thrown value carry a type.",
    "A class expression is judged wherever a declaration would be, and it is never let through.",
    "A class is read out of the syntax alone, so what it extends is judged by the name written rather than by what that name resolves to.",
  ],
} as const satisfies Check
