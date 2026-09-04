import type { CodeCheck } from "../../code-check.page-type.ts"

export const noCodeComments = {
  id: "01a04bc8-6c45-741c-8dfd-0665538af7c4",
  pageTypeSlug: "code-check",
  slug: "no-code-comments",
  definition: "the check refusing a comment that is none of the code comment forms",
  code: "ts",
  test: "ts",
  runsOnPatch: false,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A comment no program parses is prose whatever the comment says.",
    },
    {
      invariantKind: "absence",
      statement: "A form only another language parses stands for nothing here.",
    },
    {
      invariantKind: "departure",
      statement: "A comment in code is read from the token stream rather than from the text.",
    },
    {
      invariantKind: "departure",
      statement: "A stylesheet carries a comment in exactly one form.",
    },
    {
      invariantKind: "departure",
      statement:
        "A comment in a stylesheet is found by scanning past the strings the stylesheet holds.",
    },
    {
      invariantKind: "gap",
      statement: "A stylesheet is read by a parser rather than by a scan.",
    },
    {
      invariantKind: "departure",
      statement: "The forms are held in the check's own code.",
    },
    {
      invariantKind: "constraint",
      statement: "A shebang is trivia the parser takes before any comment.",
    },
    {
      invariantKind: "gap",
      statement: "The code comment forms are read from a page rather than copied into this check.",
    },
  ],
} as const satisfies CodeCheck
