import type { Check } from "../check.page-type.ts"

export const noCodeComments = {
  id: "01a04bc8-6c45-741c-8dfd-0665538af7c4",
  pageTypeSlug: "check",
  slug: "no-code-comments",
  definition: "the check refusing a comment that is none of the code comment forms",
  code: "ts",
  test: "ts",
  needs: "file",
  runsOn: ["patch", "worktree", "deploy"],
  design: [
    {
      invariantKind: "departure",
      statement:
        "A form earns its place by being parsed by a program, so a comment no program reads is prose whatever it says.",
    },
    {
      invariantKind: "constraint",
      statement:
        "Every file the akasha folder holds is TypeScript, so a form only another language parses stands for nothing here.",
    },
    {
      invariantKind: "departure",
      statement: "A comment is read from the token stream, never from the text.",
    },
    {
      invariantKind: "departure",
      statement: "The forms are held in the check's own code.",
    },
    {
      invariantKind: "constraint",
      statement:
        "A shebang is trivia the parser takes before any comment, so it is never seen as one.",
    },
  ],
} as const satisfies Check
