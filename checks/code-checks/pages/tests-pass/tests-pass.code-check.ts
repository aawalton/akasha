import type { CodeCheck } from "../../code-check.page-type.ts"

export const testsPass = {
  id: "01a04eb6-9214-7000-be71-821a1a582fbe",
  pageTypeSlug: "code-check",
  type: "code-check",
  slug: "tests-pass",
  definition: "the check refusing a change whose tests do not pass",
  runsOnPatch: true,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: false,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The tests a change is judged by are the ones standing beside the files the change has.",
    },

    {
      invariantKind: "constraint",
      statement: "A module loaded from two trees at once is two modules.",
    },
    {
      invariantKind: "departure",
      statement: "The run reads a body the change has whether or not a file is at that path.",
    },
    {
      invariantKind: "departure",
      statement: "The run reads the change's bodies through an overlay mounted over the checkout.",
    },
    {
      invariantKind: "departure",
      statement: "A body the change answers nothing for is a path the overlay takes away.",
    },
    {
      invariantKind: "departure",
      statement: "The run reads the index this change leaves rather than the index HEAD holds.",
    },
    {
      invariantKind: "departure",
      statement: "That index reaches the run as bodies over the checkout, as the change's own do.",
    },
    {
      invariantKind: "departure",
      statement: "An entry file the change empties is a path the overlay takes away too.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest the change has is reached under the name that manifest states.",
    },
    {
      invariantKind: "departure",
      statement: "That name is a link the overlay makes onto the folder the manifest sits in.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest calling its package nothing is reached under no name.",
    },
    {
      invariantKind: "absence",
      statement: "The manifest at the repository root is reached under no name.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page type the change moves is resolved by the run at the path the change files it at.",
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
      statement: "A change with no file with a test beside that file is judged by no run.",
    },
    {
      invariantKind: "departure",
      statement: "A file the index files a test beside is input to the check.",
    },
    {
      invariantKind: "departure",
      statement: "A change with only a test runs that test.",
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
      statement: "What was written to mount the bodies is swept whatever the run said.",
    },
    {
      invariantKind: "departure",
      statement: "A change with a test file that costs more than that file may is refused.",
    },
    {
      invariantKind: "departure",
      statement: "That refusal names each file over the ceiling.",
    },
    {
      invariantKind: "departure",
      statement: "That refusal names the seconds each file over the ceiling spent.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names the ceiling those seconds are read against.",
    },
    {
      invariantKind: "departure",
      statement:
        "A run ended at its ceiling with no file over on its own says so rather than blaming the runner.",
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
      invariantKind: "departure",
      statement: "A run told to measure has every test file named to no ceiling.",
    },
    {
      invariantKind: "departure",
      statement: "A measuring run answers each file beside the seconds that file spent.",
    },
    {
      invariantKind: "departure",
      statement: "A measuring run refuses whatever the tests said, so nothing lands.",
    },
    {
      invariantKind: "departure",
      statement: "A file whose measured run came back unclean is said to be unclean.",
    },
    {
      invariantKind: "absence",
      statement: "No measuring run says whether the tests passed.",
    },
    {
      invariantKind: "departure",
      statement: "The whole output of the run is in the refusal.",
    },
    {
      invariantKind: "departure",
      statement: "The color the runner painted the output with is taken out.",
    },
    {
      invariantKind: "departure",
      statement: "A blank line the runner printed is taken out.",
    },
    {
      invariantKind: "absence",
      statement: "No count of lines is kept from the output.",
    },
    {
      invariantKind: "departure",
      statement: "How much of a refusal one answer has is settled where the apply answers.",
    },
    {
      invariantKind: "gap",
      statement: "A failing run is reported against the first test file the run named.",
    },
    {
      invariantKind: "departure",
      statement:
        "That refusal says deleting a test nothing needs is the best way to make a file cheaper.",
    },
  ],
  check: { maxCpuSeconds: 300 },
} as const satisfies CodeCheck
