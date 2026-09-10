import type { CodeCheck } from "../../code-check.page-type.ts"

export const noRuleInTwoFiles = {
  id: "01a04ea7-b2ea-7085-ba99-952e24d4a8bb",
  pageTypeSlug: "code-check",
  type: "code-check",
  slug: "no-rule-in-two-files",
  definition: "the check refusing a function whose rule is spelled in another file as well",
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
      statement: "Every file with a rule spelled elsewhere as well is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names one other file with the rule and counts the rest.",
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
      statement: "No file owns a rule by exporting that rule.",
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
      statement: "A function joining its own names into a template is a naming rather than a rule.",
    },
    {
      invariantKind: "departure",
      statement: "Two namings of one shape in two domains keep step with nothing and do not drift.",
    },
    {
      invariantKind: "departure",
      statement: "A body with nothing to change cannot drift.",
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
      statement: "Every file the index names is read on each run whatever the change has.",
    },
    {
      invariantKind: "absence",
      statement: "A rule in a file no page claims is left unread.",
    },
    {
      invariantKind: "departure",
      statement:
        "A rule in two files during a move from the first file to the second is a landing partway.",
    },
  ],
  check: { maxCpuSeconds: 10 },
} as const satisfies CodeCheck
