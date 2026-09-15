import type { CheckCode } from "akasha/check/code/check-code.page-type.types.ts"

export const calculationImportsOnlyTypes = {
  id: "01a07222-b261-7961-a84e-6a8e0c0e5ed3",
  type: "page-type/check-code",
  slug: "calculation-imports-only-types",
  definition: "the check refusing an import a calculation cannot fold into its own text",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A calculation is loaded by running its code file's text.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Only a computed-property-module's code file is folded into that text.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Any other import that is not type-only is missing at query time rather than at typecheck.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A named element imported from a computed-property-module is let through.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A default or namespace import of a computed-property-module is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An import clause marked `type` is let through.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A named element marked `type` under a plain clause is let through.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An import declaration with no clause is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A default import is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A namespace import is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refusal names the line and the name or the source the import came from.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement:
        "Only a calculation's code file and a computed-property-module's code file are judged.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A computed-property-module's code file is judged by the rule a calculation is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "This check's input is those files alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A change with no such file does not run this check.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here judges a calculation's exports.",
    },
  ],
  check: { maxCpuSeconds: 1 },
  audit: { maxCpuSeconds: 15 },
} as const satisfies CheckCode
