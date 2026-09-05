import type { CodeCheck } from "../../code-check.page-type.ts"

export const noRuleInTwoFiles = {
  id: "01a04ea7-b2ea-7085-ba99-952e24d4a8bb",
  pageTypeSlug: "code-check",
  slug: "no-rule-in-two-files",
  definition: "the check refusing a function whose rule is spelled in another file as well",
  code: "ts",
  test: "ts",
  runsOnPatch: false,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: false,
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
      statement: "A function that only passes names along is no rule.",
    },
    {
      invariantKind: "departure",
      statement: "A body holding nothing to change cannot drift.",
    },
    {
      invariantKind: "departure",
      statement: "A cast is passed over however many files write that cast.",
    },
    {
      invariantKind: "departure",
      statement: "An empty body is passed over the same way.",
    },
    {
      invariantKind: "absence",
      statement: "A writer is never sent to add a module to quiet this check.",
    },
    {
      invariantKind: "departure",
      statement: "Every file the index names is read on each run whatever the change carries.",
    },
    {
      invariantKind: "departure",
      statement: "The check judges at audit alone.",
    },
    {
      invariantKind: "departure",
      statement:
        "A rule in two files during a move from one file to the other is a landing partway.",
    },
  ],
} as const satisfies CodeCheck
