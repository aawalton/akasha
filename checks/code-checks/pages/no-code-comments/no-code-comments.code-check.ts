import type { CodeCheck } from "akasha/checks/code-checks/code-check.page-type.types.ts"

export const noCodeComments = {
  id: "01a04bc8-6c45-741c-8dfd-0665538af7c4",
  pageTypeSlug: "code-check",
  type: "code-check",
  slug: "no-code-comments",
  definition: "the check refusing a comment that is none of the code comment forms",
  runsOnChange: true,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A comment no program parses is prose whatever the comment says.",
    },
    {
      invariantKind: "absence",
      statement: "A form only another language parses represents nothing here.",
    },
    {
      invariantKind: "departure",
      statement: "A comment in code is read from the token stream rather than from the text.",
    },
    {
      invariantKind: "departure",
      statement: "A stylesheet has a comment in exactly one form.",
    },
    {
      invariantKind: "departure",
      statement:
        "A comment in a stylesheet is found by scanning past the strings the stylesheet has.",
    },
    {
      invariantKind: "departure",
      statement: "The forms are held in the check's own code.",
    },
    {
      invariantKind: "constraint",
      statement: "A shebang is trivia the parser takes before any comment.",
    },
  ],
  check: { maxCpuSeconds: 10 },
  audit: { maxCpuSeconds: 15 },
} as const satisfies CodeCheck
