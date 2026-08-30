import type { Check } from "../check.page-type.ts"

export const noClass = {
  id: "01a04bc8-6c37-77b0-9ff6-5922a789c962",
  pageTypeSlug: "check",
  slug: "no-class",
  definition: "the check refusing a class that is not an error type",
  code: "ts",
  test: "ts",
  runsOnPatch: true,
  runsOnWorktree: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "constraint",
      statement:
        "A class extending `Error` is let through: the language gives no other way to make a thrown value carry a type.",
    },
    {
      invariantKind: "departure",
      statement:
        "A class expression is judged wherever a declaration would be. It is never let through.",
    },
    {
      invariantKind: "departure",
      statement:
        "What a class extends is judged by the name written — never by what that name resolves to.",
    },
  ],
} as const satisfies Check
