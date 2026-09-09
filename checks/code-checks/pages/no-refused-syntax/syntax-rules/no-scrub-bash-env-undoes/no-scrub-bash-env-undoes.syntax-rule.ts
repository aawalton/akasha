import type { SyntaxRule } from "../syntax-rule.page-type.ts"

export const noScrubBashEnvUndoes = {
  id: "01a08230-0014-772b-9adf-c9c4f73e3f7d",
  pageTypeSlug: "syntax-rule",
  type: "syntax-rule",
  slug: "no-scrub-bash-env-undoes",
  definition:
    "the rule refusing an `env -u` scrub the bash startup file undoes before the command runs",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A call is judged by the words the call is handed rather than by the call's name.",
    },
    {
      invariantKind: "departure",
      statement: "The words a list has are read as one command line.",
    },
    {
      invariantKind: "departure",
      statement: "A command written as one string is split on whitespace into that same word line.",
    },
    {
      invariantKind: "departure",
      statement: "A value put into a template is one word whose spelling is unknown.",
    },
    {
      invariantKind: "departure",
      statement:
        "The command run is the first word past the flags and the assignments `env` was given.",
    },
    {
      invariantKind: "departure",
      statement: "A word line whose command is unknown is left.",
    },
    {
      invariantKind: "departure",
      statement: "`BASH_ENV` given a value in the same call leaves that call alone.",
    },
    {
      invariantKind: "departure",
      statement: "`BASH_ENV` taken away in the same call leaves that call alone.",
    },
    {
      invariantKind: "departure",
      statement: "A file named `.sh` or `.bash` is read as a script a bash runs.",
    },
    {
      invariantKind: "departure",
      statement: "A call already refused is not read again through the arguments the call has.",
    },
    {
      invariantKind: "gap",
      statement:
        "A script whose first line names a shell reading no startup file is refused with the rest.",
    },
    {
      invariantKind: "gap",
      statement: "A shell file writing this call is judged by nothing here.",
    },
  ],
} as const satisfies SyntaxRule
