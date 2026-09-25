import type { CheckCode } from "akasha/check/code/check-code.page-type.types.ts"

export const definitionIsWrittenInTheGrammar = {
  id: "01a0c5a2-e928-79d5-a7df-fa445a54757a",
  type: "page-type/check-code",
  slug: "definition-is-written-in-the-grammar",
  definition: "the check refusing a definition the grammar writes no way or more than one way",
  runsOnChange: false,
  runsOnDeploy: false,
  runsOnAudit: true,
  experimental: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A definition is judged from the phrase kind the definition property names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A definition the grammar writes no way is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A definition the grammar writes more than one way is refused as well.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page of the domain page type is judged, and so is a page of any type under it.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here judges a property other than a definition.",
    },
  ],
  decision: { maxCpuSeconds: 10 },
  audit: { maxCpuSeconds: 120 },
} as const satisfies CheckCode
