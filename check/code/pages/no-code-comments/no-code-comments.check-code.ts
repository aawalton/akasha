import type { CheckCode } from "akasha/check/code/check-code.page-type.types.ts"

export const noCodeComments = {
  id: "01a04bc8-6c45-741c-8dfd-0665538af7c4",
  type: "page-type/check-code",
  slug: "no-code-comments",
  definition: "the check refusing a comment that is none of the code comment forms",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A comment no program parses is prose whatever the comment says.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A form only another language parses represents nothing here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A comment in code is read from the token stream rather than from the text.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stylesheet has a comment in exactly one form.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A comment in a stylesheet is found by scanning past the strings the stylesheet has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The forms are held in the check's own code.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A shebang is trivia the parser takes before any comment.",
    },
  ],
  check: { maxCpuSeconds: 10 },
  audit: { maxCpuSeconds: 15 },
} as const satisfies CheckCode
