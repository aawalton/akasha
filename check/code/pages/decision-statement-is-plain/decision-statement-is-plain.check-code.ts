import type { CheckCode } from "akasha/check/code/check-code.page-type.types.ts"

export const decisionStatementIsPlain = {
  id: "01a05407-306d-7b50-85c4-bf43575aa786",
  type: "page-type/check-code",
  slug: "decision-statement-is-plain",
  definition: "the check refusing an decision that is not written in plain language",
  runsOnChange: false,
  runsOnDeploy: false,
  runsOnAudit: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A statement is read from the file the parser read rather than from the page a loader built.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An decision is judged here and nothing else a page says.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A consequence joined to a fact is refused as a reason is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A statement is refused for the words joining two facts rather than for the two facts.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A mark inside a spelt name is no mark of the statement's own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A word inside a spelt name is no word of the statement's own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A statement written in a shape akasha refuses is not plain.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A statement is judged against every refused shape the index names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A statement already refused for a mark is not judged against the shapes too.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal names the shape that matched.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A statement no refused shape matches is passed over rather than refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A sentence no shape reaches is a gap in the shapes rather than a fault in the statement.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "Every decision under akasha is plain.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A mark a reason follows is refused as a reason rather than as a join.",
    },
  ],
  check: { maxCpuSeconds: 10 },
  audit: { maxCpuSeconds: 15 },
  experimental: true,
} as const satisfies CheckCode
