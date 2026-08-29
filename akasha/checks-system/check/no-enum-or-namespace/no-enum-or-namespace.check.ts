import type { Check } from "../check.page-type.ts"

export const noEnumOrNamespace = {
  id: "01a04bc8-6c55-748f-89e3-72c3b8da2444",
  pageTypeSlug: "check",
  slug: "no-enum-or-namespace",
  definition: "the check refusing an enum or a named namespace",
  code: "ts",
  test: "ts",
  runsOn: ["patch", "worktree", "deploy"],
  design: [
    {
      invariantKind: "absence",
      statement:
        "A module named by a string is a declaration about a package rather than a namespace, and is not judged.",
    },
    {
      invariantKind: "absence",
      statement: "`declare global` is left alone, because it names no namespace of its own.",
    },
    {
      invariantKind: "departure",
      statement: "An enum and a namespace are one check.",
    },
  ],
} as const satisfies Check
