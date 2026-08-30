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
        "A rule is read from every file the index names, not from module code alone, so a helper two tests share is seen as well as a rule two modules share.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every file carrying a rule that stands elsewhere is refused, because where nothing owns the rule no file among them is the one that may keep it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A refusal names one other file carrying the rule and counts the rest, so what to read next is one path rather than a list.",
    },
    {
      invariantKind: "departure",
      statement:
        "One file saying the same thing twice is passed over, because one file is already one place.",
    },
    {
      invariantKind: "absence",
      statement:
        "Which file should keep the rule is not said. Choosing the home is a judgement about what a thing is for, and naming the collision is what can be answered from the source.",
    },
    {
      invariantKind: "absence",
      statement:
        "Only a function is read and only a renaming is defeated, as in the reading this shares with no-second-spelling.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every file the index names is read on each run, whatever the change carries, so a rule arriving in one file is answered against the whole tree rather than against the change.",
    },
    {
      invariantKind: "departure",
      statement:
        "This judges at audit alone, because it reads the whole tree however small the change is, and at patch it refuses a file the change never touched.",
    },
    {
      invariantKind: "departure",
      statement:
        "A rule standing in two files while one is being moved to the other is what a landing looks like partway, and only a sweep of the settled tree can tell that apart from a rule left in two places.",
    },
  ],
} as const satisfies Check
