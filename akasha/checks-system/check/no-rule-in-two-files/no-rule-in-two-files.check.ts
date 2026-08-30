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
        "A rule is read from every file the index names rather than from module code alone.",
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
      statement: "Which file should keep the rule is not said.",
    },
    {
      invariantKind: "absence",
      statement: "No file owns a rule by exporting it.",
    },
    {
      invariantKind: "absence",
      statement: "The two files are named alike and the writer picks.",
    },
    {
      invariantKind: "absence",
      statement: "Only a function is read and only a renaming is defeated.",
    },
    {
      invariantKind: "departure",
      statement: "Every file the index names is read on each run whatever the change carries.",
    },
    {
      invariantKind: "departure",
      statement: "This judges at audit alone.",
    },
    {
      invariantKind: "departure",
      statement:
        "A rule standing in two files while one is being moved to the other is what a landing looks like partway.",
    },
  ],
} as const satisfies Check
