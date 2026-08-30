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
      statement: "Audit is handed every file, so the tests beside all of them are the whole suite.",
    },
    {
      invariantKind: "departure",
      statement:
        "The tests run in a world written out of what the change proposes, never in the working tree, so what is judged is this change and not whatever else stands on disk.",
    },
    {
      invariantKind: "departure",
      statement:
        "A test stands beside a changed file when the change answers a body for it, so a test the change brings is run and one it takes away is not.",
    },
    {
      invariantKind: "departure",
      statement: "The verdict is read from what the run printed, not from its exit code alone.",
    },
    {
      invariantKind: "departure",
      statement:
        "A run reaching fewer files than it named has failed, because the rest said nothing.",
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
      statement:
        "A test may reach the gate, so a run already inside a run judges nothing and lets the outer one answer.",
    },
    {
      invariantKind: "constraint",
      statement:
        "The world is swept whatever the run said, so no tree is left behind by a refusal.",
    },
    {
      invariantKind: "gap",
      statement:
        "A change breaking a test standing beside another file passes on patch, and audit is what finds it.",
    },
    {
      invariantKind: "gap",
      statement: "A failing run is reported against the first test file it named.",
    },
  ],
} as const satisfies Check
