import type { Command } from "akasha/commands/command.page-type.types.ts"

export const measureTest = {
  id: "01a09ba9-360f-77a7-9c21-32599d7d1b30",
  type: "command",
  slug: "measure-test",
  definition: "the command saying what a test run cost in processor time and memory",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A call naming no argument reads the past twenty-four hours.",
    },
    {
      invariantKind: "departure",
      statement: "A run is one test file run on its own.",
    },
    {
      invariantKind: "departure",
      statement: "The rows are read from beside the page whose code that test proves.",
    },
    {
      invariantKind: "departure",
      statement: "A test file beside no page of its own is gathered under the page it proves.",
    },
    {
      invariantKind: "departure",
      statement: "Every entries file the tree holds is read rather than the files beside one kind.",
    },
    {
      invariantKind: "departure",
      statement: "A folder git or a package manager owns is walked past.",
    },
    {
      invariantKind: "departure",
      statement: "Every numbered file of those rows is read rather than the first alone.",
    },
    {
      invariantKind: "departure",
      statement: "A row naming the test phase is read and no other row is.",
    },
    {
      invariantKind: "departure",
      statement: "A landing writes such a row and an audit writes one too.",
    },
    {
      invariantKind: "departure",
      statement: "Both are read here.",
    },
    {
      invariantKind: "departure",
      statement: "The runs are gathered under the test file that ran.",
    },
    {
      invariantKind: "departure",
      statement:
        "A test run's processor time is what the run spawned spent rather than the measuring run's own.",
    },
    {
      invariantKind: "departure",
      statement:
        "A test file may spend five processor seconds and a change carrying one past that is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A test file is throttled at five hundred and twelve megabytes rather than ended.",
    },
    {
      invariantKind: "departure",
      statement: "The memory reported is what the run peaked at under that throttle.",
    },
    {
      invariantKind: "departure",
      statement: "A file that would not read is named rather than counting as no runs.",
    },
    {
      invariantKind: "departure",
      statement: "A row a write left half appended is passed over and the rest of the file read.",
    },
    {
      invariantKind: "departure",
      statement: "A test file holding no run of what was chosen is not listed at all.",
    },
    {
      invariantKind: "departure",
      statement: "The total counts the distinct runs read rather than the records read.",
    },
    {
      invariantKind: "departure",
      statement: "The total shares the processor time over the distinct runs read.",
    },
    {
      invariantKind: "departure",
      statement: "The total draws its memory as `-`.",
    },
    {
      invariantKind: "departure",
      statement: "A run that noted no high-water mark is left out of the memory reported.",
    },
    {
      invariantKind: "departure",
      statement: "Test files are ordered by what their runs took on average.",
    },
    {
      invariantKind: "departure",
      statement: "Test files taking equal processor time are ordered by name.",
    },
    {
      invariantKind: "absence",
      statement: "A run writes no value the commit has.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here runs a test.",
    },
    {
      invariantKind: "departure",
      statement: "An argument this command does not take is refused.",
    },
  ],
  name: "test",
  arguments: [{ argument: "argument/run-window" }],
} as const satisfies Command
