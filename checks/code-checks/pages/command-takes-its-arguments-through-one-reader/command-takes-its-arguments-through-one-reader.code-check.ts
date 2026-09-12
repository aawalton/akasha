import type { CodeCheck } from "akasha/checks/code-checks/code-check.page-type.types.ts"

export const commandTakesItsArgumentsThroughOneReader = {
  id: "01a09518-e34b-711d-97f3-8664b5b48363",
  type: "code-check",
  slug: "command-takes-its-arguments-through-one-reader",
  definition: "the check refusing a command's code that reads the words of its own call itself",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnWorktree: false,
  runsOnAudit: false,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A command's call arrives as the first parameter of the function that command's slug names.",
    },
    {
      invariantKind: "departure",
      statement: "`takenFor` is the one reader of those words.",
    },
    {
      invariantKind: "departure",
      statement: "A word handed on to a call is passed over here.",
    },
    {
      invariantKind: "departure",
      statement: "A call to a function the same file declares is followed into that function.",
    },
    {
      invariantKind: "departure",
      statement: "A call to anything that file imports carries the words out of this judgement.",
    },
    {
      invariantKind: "departure",
      statement: "A command naming those words nowhere takes nothing and is refused nothing.",
    },
    {
      invariantKind: "departure",
      statement: "Only the file holding a command's code is judged.",
    },
    {
      invariantKind: "departure",
      statement: "A file outside `commands/pages` is refused nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names the line the words are read on.",
    },
    {
      invariantKind: "departure",
      statement: "Every read of those words is refused apart.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing is judged while this page states `experimental`.",
    },
    {
      invariantKind: "departure",
      statement:
        "`experimental` comes off this page once no command's code reads the words of its own call.",
    },
    {
      invariantKind: "absence",
      statement: "A reader another file holds is judged by nothing here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads which arguments a command's page names.",
    },
    {
      invariantKind: "absence",
      statement: "A name of its own a nested function binds is not told apart from those words.",
    },
  ],
  check: { maxCpuSeconds: 10 },
  audit: { maxCpuSeconds: 15 },
  experimental: true,
} as const satisfies CodeCheck
