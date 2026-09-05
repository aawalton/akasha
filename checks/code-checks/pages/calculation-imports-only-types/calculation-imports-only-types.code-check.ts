import type { CodeCheck } from "../../code-check.page-type.ts"

export const calculationImportsOnlyTypes = {
  id: "01a07222-b261-7961-a84e-6a8e0c0e5ed3",
  pageTypeSlug: "code-check",
  slug: "calculation-imports-only-types",
  definition: "the check refusing an import that is not type-only in a calculation's code file",
  code: "ts",
  test: "ts",
  runsOnPatch: true,
  runsOnWorktree: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A calculation is loaded by running its code file's text.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing resolves an import while that text runs.",
    },
    {
      invariantKind: "departure",
      statement:
        "An import that is not type-only is missing at query time rather than at typecheck.",
    },
    {
      invariantKind: "departure",
      statement: "An import clause marked `type` is let through.",
    },
    {
      invariantKind: "departure",
      statement: "A named element marked `type` under a plain clause is let through.",
    },
    {
      invariantKind: "departure",
      statement: "An import declaration carrying no clause is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A default import is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A namespace import is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names the line, and the name or the source it came from.",
    },
    {
      invariantKind: "absence",
      statement: "Only a file named `.computed-property.code.ts` is judged.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges what a calculation exports.",
    },
  ],
} as const satisfies CodeCheck
