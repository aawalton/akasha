import type { CodeCheck } from "../../code-check.page-type.types.ts"

export const testsPass = {
  id: "01a04eb6-9214-7000-be71-821a1a582fbe",
  pageTypeSlug: "code-check",
  type: "code-check",
  slug: "tests-pass",
  definition: "the check refusing a change whose tests do not pass",
  runsOnChange: true,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The tests a change is judged by are the ones standing beside the files the change has.",
    },
    {
      invariantKind: "departure",
      statement: "A test beside no changed file is left red rather than made input.",
    },
    {
      invariantKind: "departure",
      statement: "A test another file's change breaks is a test in the wrong file.",
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
      statement: "That index reaches the run as bodies over the checkout.",
    },
    {
      invariantKind: "departure",
      statement: "The change's own bodies reach the run that way too.",
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
        "A page type the change moves is resolved by the run at the path the change files that type at.",
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
      statement: "The marker saying a run is going descends every process that run starts.",
    },
    {
      invariantKind: "departure",
      statement: "A run already inside a run refuses rather than saying the tests passed.",
    },
    {
      invariantKind: "departure",
      statement: "That refusal says no test ran and what says a run is already going.",
    },
    {
      invariantKind: "departure",
      statement: "A run already inside a run refuses nothing where the change names no test.",
    },
    {
      invariantKind: "constraint",
      statement: "Whatever was written to mount the bodies is swept whatever the run said.",
    },
    {
      invariantKind: "departure",
      statement: "A change with a test file costing above the ceiling that file has is refused.",
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
      statement: "A measuring run refuses whatever the tests said.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing lands.",
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
      invariantKind: "departure",
      statement: "A run that failed is reported against the first file its output blames.",
    },
    {
      invariantKind: "departure",
      statement: "A short run and a crashed run are reported that way too.",
    },
    {
      invariantKind: "departure",
      statement:
        "The output blames a file only where the runner reported a failure under that file's name.",
    },
    {
      invariantKind: "departure",
      statement: "The runner reports a failure by a failed test line or an unhandled error line.",
    },
    {
      invariantKind: "constraint",
      statement: "An error a test logs is printed just as the runner prints an error.",
    },
    {
      invariantKind: "departure",
      statement:
        "A header for a file the run did not name takes the blame off the file named before it.",
    },
    {
      invariantKind: "departure",
      statement: "A run whose output blames no file is reported against the first file named.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal blaming no file says the file it names is not the file that failed.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal says how many errors the run raised outside any test.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names a file that errored as errored rather than as failed.",
    },
    {
      invariantKind: "departure",
      statement:
        "That refusal says deleting a test nothing needs is the best way to make a file cheaper.",
    },
    {
      invariantKind: "departure",
      statement: "No total holds a run.",
    },
    {
      invariantKind: "departure",
      statement: "Each test file is held to the ceiling its property states.",
    },
    {
      invariantKind: "departure",
      statement:
        "A total would fall only by having fewer tests rather than by any test being faster.",
    },
  ],
  check: {},
  audit: {},
} as const satisfies CodeCheck
