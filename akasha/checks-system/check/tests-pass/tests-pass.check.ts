import type { Check } from "../check.page-type.ts"

export const testsPass = {
  id: "01a04eb6-9214-7000-be71-821a1a582fbe",
  pageTypeSlug: "check",
  slug: "tests-pass",
  definition: "the check refusing a change whose tests do not pass",
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
        "The tests a change is judged by are the ones standing beside the files it carries.",
    },
    {
      invariantKind: "departure",
      statement: "Audit is handed every file.",
    },
    {
      invariantKind: "departure",
      statement:
        "The tests run in a world written out of what the change proposes rather than in the working tree.",
    },
    {
      invariantKind: "departure",
      statement: "A test stands beside a changed file when the change answers a body for it.",
    },
    {
      invariantKind: "departure",
      statement:
        "The verdict is read from what the run printed rather than from its exit code alone.",
    },
    {
      invariantKind: "departure",
      statement: "A run reaching fewer files than it named has failed.",
    },
    {
      invariantKind: "departure",
      statement: "A change carrying no file with a test beside it is judged by no run.",
    },
    {
      invariantKind: "absence",
      statement: "No test is named for a file whose test does not stand beside it.",
    },
    {
      invariantKind: "constraint",
      statement: "A test may reach the gate.",
    },
    {
      invariantKind: "constraint",
      statement: "A run already inside a run judges nothing and lets the outer one answer.",
    },
    {
      invariantKind: "constraint",
      statement: "The world is swept whatever the run said.",
    },
    {
      invariantKind: "gap",
      statement: "No test runs at patch.",
    },
    {
      invariantKind: "gap",
      statement: "A failing run is reported against the first test file it named.",
    },
  ],
} as const satisfies Check
