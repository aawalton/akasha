import type { Check } from "../check.page-type.ts"

export const noRuleInTwoFiles = {
  id: "01a04ea7-b2ea-7085-ba99-952e24d4a8bb",
  pageTypeSlug: "check",
  slug: "no-rule-in-two-files",
  definition: "the check refusing a function whose rule is spelled in another file as well",
  code: "ts",
  test: "ts",
  runsOnPatch: false,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A rule is read from every file the index names — not from module code alone: a helper two tests share is seen as well as a rule two modules share.",
    },
    {
      invariantKind: "departure",
      statement: "Every file carrying a rule that stands elsewhere is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names one other file carrying the rule and counts the rest.",
    },
    {
      invariantKind: "departure",
      statement: "One file saying the same thing twice is passed over.",
    },
    {
      invariantKind: "absence",
      statement:
        "Which file should keep the rule is not said. Choosing the home is a judgement about what a thing is for. Naming the collision is what can be answered from the source.",
    },
    {
      invariantKind: "absence",
      statement:
        "No file owns a rule by exporting it. A module's export was once read as the home a respelling answered to and that is not read here: the two files are named alike and the writer picks.",
    },
    {
      invariantKind: "absence",
      statement:
        "Only a function is read and only a renaming is defeated. That is the whole of what the reading beneath this can answer.",
    },
    {
      invariantKind: "departure",
      statement: "Every file the index names is read on each run — whatever the change carries.",
    },
    {
      invariantKind: "departure",
      statement:
        "This judges at audit alone: it reads the whole tree however small the change is and at patch it refuses a file the change never touched.",
    },
    {
      invariantKind: "departure",
      statement:
        "A rule standing in two files while one is being moved to the other is what a landing looks like partway. Only a sweep of the settled tree can tell that apart from a rule left in two places.",
    },
  ],
} as const satisfies Check
