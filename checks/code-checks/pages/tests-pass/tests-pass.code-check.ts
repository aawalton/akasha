import type { CodeCheck } from "../../code-check.page-type.ts"

export const testsPass = {
  id: "01a04eb6-9214-7000-be71-821a1a582fbe",
  pageTypeSlug: "code-check",
  slug: "tests-pass",
  definition: "the check refusing a change whose tests do not pass",
  code: "ts",
  test: "ts",
  runsOnPatch: true,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: false,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The tests a change is judged by are the ones standing beside the files the change carries.",
    },

    {
      invariantKind: "departure",
      statement:
        "The tests run in the working tree, with the change's bodies served in place of the files there.",
    },
    {
      invariantKind: "departure",
      statement: "A file the change carries is served whether or not a file is there for it.",
    },
    {
      invariantKind: "departure",
      statement: "A test stands beside a changed file when the change answers a body for the test.",
    },
    {
      invariantKind: "departure",
      statement:
        "The verdict is read from the lines the run printed rather than from its exit code alone.",
    },
    {
      invariantKind: "departure",
      statement: "A run reaching fewer files than that run named has failed.",
    },
    {
      invariantKind: "departure",
      statement: "A change carrying no file with a test beside that file is judged by no run.",
    },
    {
      invariantKind: "departure",
      statement: "A file the index files a test beside is input to the check.",
    },
    {
      invariantKind: "departure",
      statement: "A change carrying only a test runs that test.",
    },
    {
      invariantKind: "absence",
      statement: "No test is named for a file whose test does not stand beside that file.",
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
      statement: "What was written to serve the bodies is swept whatever the run said.",
    },
    {
      invariantKind: "departure",
      statement: "A change carrying a test file that costs more than that file may is refused.",
    },
    {
      invariantKind: "departure",
      statement: "That refusal names each file over the ceiling and the seconds that file spent.",
    },
    {
      invariantKind: "departure",
      statement: "That refusal says the tests themselves are green.",
    },
    {
      invariantKind: "departure",
      statement: "A slow run is reported against the first file over the ceiling.",
    },
    {
      invariantKind: "gap",
      statement: "A failing run is reported against the first test file the run named.",
    },
  ],
} as const satisfies CodeCheck
