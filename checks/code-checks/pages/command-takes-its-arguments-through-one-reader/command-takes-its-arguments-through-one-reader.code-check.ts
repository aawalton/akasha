import type { CodeCheck } from "akasha/checks/code-checks/code-check.page-type.types.ts"

export const commandTakesItsArgumentsThroughOneReader = {
  id: "01a09518-e34b-711d-97f3-8664b5b48363",
  type: "code-check",
  slug: "command-takes-its-arguments-through-one-reader",
  definition: "the check refusing a read of a command's call outside the one reader",
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
      statement: "A call to a name a parameter holds is followed into that parameter's default.",
    },
    {
      invariantKind: "departure",
      statement:
        "A call to a name this file imports is followed into the file that import lands in.",
    },
    {
      invariantKind: "departure",
      statement:
        "A call to a name a dynamic import takes is followed into the file that import lands in.",
    },
    {
      invariantKind: "departure",
      statement: "A dynamic import taking the default export is followed into that export.",
    },
    {
      invariantKind: "departure",
      statement:
        "A call on a name a dynamic import takes as a whole module is followed into the export it names.",
    },
    {
      invariantKind: "departure",
      statement: "The trace stops at that one file rather than going on from there.",
    },
    {
      invariantKind: "departure",
      statement: "A call into a file judged here carries those words out of this judgement.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal reached across an import names the file the reading is written in.",
    },
    {
      invariantKind: "departure",
      statement: "A command naming those words nowhere takes nothing and is refused nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A command's code is judged.",
    },
    {
      invariantKind: "departure",
      statement: "A module's code under `commands/pages` is judged as well.",
    },
    {
      invariantKind: "departure",
      statement: "A module's code elsewhere is a reader this check does not judge.",
    },
    {
      invariantKind: "departure",
      statement: "A file outside `commands/pages` is refused nothing.",
    },
    {
      invariantKind: "departure",
      statement: "In a module's code every exported parameter spelled `argv` holds those words.",
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
      statement: "`experimental` comes off this page once nothing judged here reads those words.",
    },
    {
      invariantKind: "absence",
      statement: "A specifier landing on no path under akasha is followed nowhere.",
    },
    {
      invariantKind: "absence",
      statement:
        "A name a static import brings in as a default or as a whole module is followed nowhere.",
    },
    {
      invariantKind: "absence",
      statement: "A dynamic import naming no literal specifier is followed nowhere.",
    },
    {
      invariantKind: "absence",
      statement: "A parameter holding a function under no default is followed nowhere.",
    },
    {
      invariantKind: "absence",
      statement: "A reader two files on from a command's code is read by nothing here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads which arguments a command's page names.",
    },
    {
      invariantKind: "absence",
      statement: "A name of its own a nested function binds is not told apart from those words.",
    },
    {
      invariantKind: "absence",
      statement: "Words a module takes under another spelling are read by nothing here.",
    },
  ],
  check: { maxCpuSeconds: 10 },
  audit: { maxCpuSeconds: 15 },
  experimental: true,
} as const satisfies CodeCheck
