import type { Command } from "../command.page-type.ts"

export const lintException = {
  id: "01a061ac-d13d-7bc1-ae1e-51a3c62b00da",
  pageTypeSlug: "command",
  slug: "lint-exception",
  definition: "the linter override turning one rule off over one package's files",
  code: "ts",
  test: "ts",
  changeKindSlug: "change-authored",
  taking: [
    { said: "--package-path <path>", takes: "the package the rule is no longer judged over" },
    { said: "--rule <group>/<name>", takes: "the linter rule that is no longer judged" },
    { said: "--message <text>", takes: "what the commit is for" },
    { said: "--message-file <file>", takes: "a file the commit message is read from" },
    { said: "--break-the-glass <reason>", takes: "why no check runs, said in the commit" },
  ],
  helpNotes: [
    "--package-path repeats, so several packages join one override in one commit.",
    "the linter's config file is worked out here, so no caller names it.",
    "a package that is not there is refused, and nothing lands.",
    "a package the override already carries is answered as already carried.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The linter's config is worked out from the repository root.",
    },
    {
      invariantKind: "departure",
      statement: "A rule is said as the group it is in and the name it carries.",
    },
    {
      invariantKind: "departure",
      statement: "A package that is not there is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A package that is a file rather than a folder is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A package outside this repository is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The override already turning that rule off is the one a package joins.",
    },
    {
      invariantKind: "departure",
      statement: "A rule no override turns off is given an override of its own.",
    },
    {
      invariantKind: "departure",
      statement:
        "More than one override turning that rule off is refused rather than chosen between.",
    },
    {
      invariantKind: "departure",
      statement: "A glob the override already carries is answered as already carried.",
    },
    {
      invariantKind: "departure",
      statement: "A call adding nothing commits nothing.",
    },
    {
      invariantKind: "departure",
      statement: "The change is spliced into the one passage naming the override.",
    },
    {
      invariantKind: "departure",
      statement: "Every other byte of the config is left unchanged.",
    },
    {
      invariantKind: "departure",
      statement: "A passage found more than once in the config names no one place.",
    },
    {
      invariantKind: "departure",
      statement: "A passage naming no one place is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A config that moved between the reading and the landing refuses the change.",
    },
    {
      invariantKind: "departure",
      statement: "The body worked out is parsed again before the landing is asked for.",
    },
    {
      invariantKind: "departure",
      statement: "A body parsing to anything but the exception asked for is refused.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here runs the linter.",
    },
    {
      invariantKind: "absence",
      statement: "Which rule is worth turning off is not answered here.",
    },
    {
      invariantKind: "absence",
      statement: "No page claims the linter's config.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing is warranted here.",
    },
    {
      invariantKind: "constraint",
      statement: "The linter's config sits at the root of this repository.",
    },
    {
      invariantKind: "constraint",
      statement: "A check is handed no path outside this repository.",
    },
    {
      invariantKind: "gap",
      statement: "An exception lands through a command rather than by a hand-written commit.",
    },
  ],
} as const satisfies Command
