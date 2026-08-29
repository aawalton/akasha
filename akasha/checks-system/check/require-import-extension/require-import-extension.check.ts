import type { Check } from "../check.page-type.ts"

export const requireImportExtension = {
  id: "01a04bcb-c714-7fdf-aa64-e2ff68d4f69b",
  pageTypeSlug: "check",
  slug: "require-import-extension",
  definition:
    "the check refusing a relative specifier written without the extension of the file it names",
  code: "ts",
  test: "ts",
  runsOn: ["patch", "worktree", "deploy"],
  invariants: [
    {
      invariantKind: "constraint",
      statement:
        "A specifier naming no path of its own is a package, and a package names no file to carry an extension.",
    },
    {
      invariantKind: "departure",
      statement: "`.ts` is the only extension a relative specifier carries.",
    },
    {
      invariantKind: "departure",
      statement: "A specifier is judged where it is written.",
    },
    {
      invariantKind: "departure",
      statement: "No compiler setting decides the answer.",
    },
  ],
} as const satisfies Check
