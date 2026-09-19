import type { CheckCode } from "akasha/check/code/check-code.page-type.types.ts"

export const calculationImportsOnlyTypes = {
  id: "01a07222-b261-7961-a84e-6a8e0c0e5ed3",
  type: "page-type/check-code",
  slug: "calculation-imports-only-types",
  definition: "the check refusing an import a calculation cannot fold into its own text",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A calculation is loaded by running its code file's text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a page and a computed-property-module's code file fold into that text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page is told by the shape of its name rather than by the index.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Any other import that is not type-only is missing at query time rather than at typecheck.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A named element imported from either of those is let through.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A default or namespace import of either of those is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An import clause marked `type` is let through.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A named element marked `type` under a plain clause is let through.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An import declaration with no clause is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A default import is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A namespace import is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal names the line and the name or the source the import came from.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "Only a calculation's code file and a computed-property-module's code file are judged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A computed-property-module's code file is judged by the rule a calculation is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This check's input is those files alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change with no such file does not run this check.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here judges a calculation's exports.",
    },
  ],
  check: { maxCpuSeconds: 1 },
  audit: { maxCpuSeconds: 15 },
} as const satisfies CheckCode
