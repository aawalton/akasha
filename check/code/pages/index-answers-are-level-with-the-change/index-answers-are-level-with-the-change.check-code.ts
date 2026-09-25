import type { CheckCode } from "akasha/check/code/check-code.page-type.types.ts"

export const indexAnswersAreLevelWithTheChange = {
  id: "01a09ba5-5f5f-7ff3-9aec-c905e4d224ba",
  type: "page-type/check-code",
  slug: "index-answers-are-level-with-the-change",
  definition: "the check refusing a change whose index answers differ from what its files turn",
  runsOnChange: true,
  runsOnDeploy: false,
  runsOnAudit: false,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An answer this change's files turn and the change lands nothing for refuses it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An answer this change lands that its files turn nothing at refuses it too.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The answers the files turn are read off the index the change leaves.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No index is built again here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every index is judged here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The file of references beside a page is judged here as an index is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The file a page carries beside it is judged here as an index is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An answer already holding what the change leaves is judged by nothing here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "Nothing here judges whether the settle that turned those answers agrees with the pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Whether the answers agree with the pages is `index-is-level-with-the-pages` at audit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This check judges at change and at no other phase.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An audit is a change turning nothing, so there is nothing here for it to judge.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A change taking an answer away that the files turn nothing at is sweeping rather than refused.",
    },
  ],
  check: { maxCpuSeconds: 1 },
} as const satisfies CheckCode
