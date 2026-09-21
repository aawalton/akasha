import type { CheckCode } from "akasha/check/code/check-code.page-type.types.ts"

export const noCodeComments = {
  id: "01a04bc8-6c45-741c-8dfd-0665538af7c4",
  type: "page-type/check-code",
  slug: "no-code-comments",
  definition: "the check refusing a comment that is none of the code comment forms",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A comment no program parses is prose whatever the comment says.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A form only another language parses represents nothing here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A comment in code is read from the token stream rather than from the text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stylesheet has a comment in exactly one form.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A comment in a stylesheet is found by scanning past the strings the stylesheet has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The forms are held in the check's own code.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A shebang is trivia the parser takes before any comment.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A body whose every slash sits inside a string it opens and shuts is parsed by nothing here.",
    },
  ],
  check: { maxCpuSeconds: 1 },
  audit: { maxCpuSeconds: 15 },
} as const satisfies CheckCode
