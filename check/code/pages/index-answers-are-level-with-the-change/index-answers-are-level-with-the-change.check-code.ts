import type { CodeCheck } from "akasha/check/code/check-code.page-type.types.ts"

export const indexAnswersAreLevelWithTheChange = {
  id: "01a09ba5-5f5f-7ff3-9aec-c905e4d224ba",
  type: "code-check",
  slug: "index-answers-are-level-with-the-change",
  definition: "the check refusing a change whose index answers differ from what its files turn",
  runsOnChange: true,
  runsOnDeploy: false,
  runsOnAudit: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "An answer this change's files turn and the change lands nothing for refuses it.",
    },
    {
      invariantKind: "departure",
      statement: "An answer this change lands that its files turn nothing at refuses it too.",
    },
    {
      invariantKind: "departure",
      statement: "The answers the files turn are read off the index the change leaves.",
    },
    {
      invariantKind: "absence",
      statement: "No index is built again here.",
    },
    {
      invariantKind: "departure",
      statement: "Only an index whose own page says git holds it is judged here.",
    },
    {
      invariantKind: "departure",
      statement: "An answer already holding what the change leaves is judged by nothing here.",
    },
    {
      invariantKind: "gap",
      statement: "An answer turned outside the change's own files is judged by nothing here.",
    },
    {
      invariantKind: "departure",
      statement: "This check judges at change and at no other phase.",
    },
    {
      invariantKind: "departure",
      statement: "An audit is a change turning nothing, so there is nothing here for it to judge.",
    },
  ],
  check: { maxCpuSeconds: 5 },
} as const satisfies CodeCheck
