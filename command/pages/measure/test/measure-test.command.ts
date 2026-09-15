import type { Command } from "akasha/command/command.page-type.types.ts"

export const measureTest = {
  id: "01a09ba9-360f-77a7-9c21-32599d7d1b30",
  type: "command",
  slug: "measure-test",
  definition: "the command saying what a test run cost in processor time and memory",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call naming no argument reads the past twenty-four hours.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run is one test file run on its own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The rows are read from beside the page whose code that test proves.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A test file beside no page of its own is gathered under the page it proves.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every entries file the tree holds is read rather than the files beside one kind.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder git or a package manager owns is walked past.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every numbered file of those rows is read rather than the first alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A row naming the test phase is read and no other row is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A landing writes such a row and an audit writes one too.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Both are read here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The runs are gathered under the test file that ran.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A test run's processor time is what the run spawned spent rather than the measuring run's own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A test file may spend five processor seconds and a change carrying one past that is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A test file is throttled at five hundred and twelve megabytes rather than ended.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The memory reported is what the run peaked at under that throttle.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file that would not read is named rather than counting as no runs.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A row a write left half appended is passed over and the rest of the file read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A test file holding no run of what was chosen is not listed at all.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The total counts the distinct runs read rather than the records read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The total shares the processor time over the distinct runs read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The total draws its average memory as `-`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run that noted no high-water mark is left out of the memory reported.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Test files are ordered by what their runs took on average.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Test files taking equal processor time are ordered by name.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A run writes no value the commit has.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here runs a test.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An argument this command does not take is refused.",
    },
  ],
  name: "test",
  arguments: [{ argument: "argument/run-window" }],
} as const satisfies Command
