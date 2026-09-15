import type { Command } from "akasha/command/command.page-type.types.ts"

export const measureDeploy = {
  id: "01a09b9b-f7ff-78b8-b3dd-42885b24bb30",
  type: "command",
  slug: "measure-deploy",
  definition: "the command saying what putting a thing up cost in processor time and memory",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A call naming no argument reads the past twenty-four hours.",
    },
    {
      invariantKind: "departure",
      statement: "A run is one deploy measured around the whole call that put the thing up.",
    },
    {
      invariantKind: "departure",
      statement: "The rows are read from beside the page of the thing put up.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every kind a deploy puts up is reached through the index rather than a folder named here.",
    },
    {
      invariantKind: "departure",
      statement: "A kind put up whole is reached at the page type naming that kind.",
    },
    {
      invariantKind: "departure",
      statement: "A list built from the pages of each kind alone misses that one set of rows.",
    },
    {
      invariantKind: "departure",
      statement: "Every numbered file of those rows is read rather than the first alone.",
    },
    {
      invariantKind: "departure",
      statement: "Only the entries beside such a page are read.",
    },
    {
      invariantKind: "departure",
      statement: "A check spells the same phase into its own logs and no such log is read here.",
    },
    {
      invariantKind: "departure",
      statement: "A row naming the deploy phase is read and no other row is.",
    },
    {
      invariantKind: "departure",
      statement: "The runs are gathered under what the row says ran.",
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
      statement: "A page holding no run of what was chosen is not listed at all.",
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
      statement: "A run's processor time is that run's own together with the children it reaped.",
    },
    {
      invariantKind: "departure",
      statement: "A run's memory is what that run added over the memory resident when it opened.",
    },
    {
      invariantKind: "departure",
      statement: "A run that noted no high-water mark is left out of the memory reported.",
    },
    {
      invariantKind: "departure",
      statement: "What was put up is ordered by what its runs took on average.",
    },
    {
      invariantKind: "departure",
      statement: "Two taking equal processor time are ordered by name.",
    },
    {
      invariantKind: "absence",
      statement: "A run writes no value the commit has.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here puts anything up.",
    },
    {
      invariantKind: "departure",
      statement: "An argument this command does not take is refused.",
    },
  ],
  name: "deploy",
  arguments: [{ argument: "argument/run-window" }],
} as const satisfies Command
