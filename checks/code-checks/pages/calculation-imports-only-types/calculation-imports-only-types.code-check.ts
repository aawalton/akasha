import type { CodeCheck } from "../../code-check.page-type.ts"

export const calculationImportsOnlyTypes = {
  id: "01a07222-b261-7961-a84e-6a8e0c0e5ed3",
  pageTypeSlug: "code-check",
  type: "code-check",
  slug: "calculation-imports-only-types",
  definition: "the check refusing an import a calculation cannot fold into its own text",
  code: "ts",
  test: "ts",
  runsOnPatch: true,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A calculation is loaded by running its code file's text.",
    },
    {
      invariantKind: "departure",
      statement: "Only a computed-property-module's code file is folded into that text.",
    },
    {
      invariantKind: "departure",
      statement:
        "Any other import that is not type-only is missing at query time rather than at typecheck.",
    },
    {
      invariantKind: "departure",
      statement: "A named element imported from a computed-property-module is let through.",
    },
    {
      invariantKind: "departure",
      statement: "A default or namespace import of a computed-property-module is refused.",
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
      statement: "An import declaration with no clause is refused.",
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
      statement: "A refusal names the line and the name or the source the import came from.",
    },
    {
      invariantKind: "absence",
      statement:
        "Only a calculation's code file and a computed-property-module's code file are judged.",
    },
    {
      invariantKind: "departure",
      statement: "A computed-property-module's code file is judged by the rule a calculation is.",
    },
    {
      invariantKind: "departure",
      statement: "This check's input is those files alone.",
    },
    {
      invariantKind: "departure",
      statement: "A change with no such file does not run this check.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges a calculation's exports.",
    },
  ],
} as const satisfies CodeCheck
