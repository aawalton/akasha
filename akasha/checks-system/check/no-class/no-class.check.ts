import type { Check } from "../check.page-type.ts"

export const noClass = {
  id: "01a04bc8-6c37-77b0-9ff6-5922a789c962",
  pageTypeSlug: "check",
  slug: "no-class",
  definition: "the check refusing a class that is not an error type",
  code: "ts",
  test: "ts",
  needs: "file",
  runsOn: ["patch", "worktree", "deploy"],
  design: [
    "A class extending `Error` is let through, because the language gives no other way to make a thrown value carry a type.",
    "A class expression is judged wherever a declaration would be, and it is never let through.",
    "A class is read out of the syntax alone, so what it extends is judged by the name written rather than by what that name resolves to.",
  ],
} as const satisfies Check
