import type { Command } from "akasha/command/command.page-type.types.ts"

export const measureGuard = {
  id: "01a09bab-b70c-74dd-9daa-6859cb57c2c4",
  type: "command",
  slug: "measure-guard",
  definition: "the command saying what a guard over a tool call cost in processor time and memory",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A guard here is a hook the dispatch runs over a tool call.",
    },
    {
      invariantKind: "departure",
      statement: "A change guard is another thing under the same word and is counted nowhere here.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming no argument reads the past twenty-four hours.",
    },
    {
      invariantKind: "departure",
      statement: "A run is one guard run over one tool call.",
    },
    {
      invariantKind: "departure",
      statement: "The rows are read from beside the page of the guard that ran.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every guard the dispatch runs is reached through the index rather than a folder named here.",
    },
    {
      invariantKind: "departure",
      statement: "An inference hook is dispatched the same way and is read here too.",
    },
    {
      invariantKind: "departure",
      statement: "Every numbered file of those rows is read rather than the first alone.",
    },
    {
      invariantKind: "departure",
      statement:
        "The phase a row spells is the harness event name rather than a phase of akasha's own.",
    },
    {
      invariantKind: "departure",
      statement: "The events read are the events the guard pages name.",
    },
    {
      invariantKind: "departure",
      statement: "A row naming a test run beside the same page counts nowhere here.",
    },
    {
      invariantKind: "departure",
      statement: "The runs are gathered under the guard that ran.",
    },
    {
      invariantKind: "departure",
      statement: "The refusals counted are the calls that guard blocked.",
    },
    {
      invariantKind: "gap",
      statement: "The seconds recorded are the dispatcher's child seconds and so the guard's.",
    },
    {
      invariantKind: "gap",
      statement: "The peak is the dispatcher's own mark rather than the guard's.",
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
      statement: "A guard holding no run of what was chosen is not listed at all.",
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
      statement: "The total's refusals are the refusals of every record read added together.",
    },
    {
      invariantKind: "departure",
      statement: "A run that noted no high-water mark is left out of the memory reported.",
    },
    {
      invariantKind: "departure",
      statement: "Guards are ordered by what their runs took on average.",
    },
    {
      invariantKind: "departure",
      statement: "Guards taking equal processor time are ordered by name.",
    },
    {
      invariantKind: "absence",
      statement: "A run writes no value the commit has.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here runs a guard.",
    },
    {
      invariantKind: "departure",
      statement: "An argument this command does not take is refused.",
    },
  ],
  name: "guard",
  arguments: [{ argument: "argument/run-window" }],
} as const satisfies Command
