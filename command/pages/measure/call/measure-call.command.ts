import type { Command } from "akasha/command/command.page-type.types.ts"

export const measureCall = {
  id: "01a09c03-14dc-7bde-8003-e7a2d36ad350",
  type: "command",
  slug: "measure-call",
  definition: "the command saying what a bash call cost in processor time and memory",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A call here is one bash call an agent made.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming no argument reads the past twenty-four hours.",
    },
    {
      invariantKind: "departure",
      statement: "The rows are read from beside the page of the seat the call was made from.",
    },
    {
      invariantKind: "departure",
      statement: "Every seat is reached through the index rather than a folder named here.",
    },
    {
      invariantKind: "departure",
      statement: "Every numbered file of those rows is read rather than the first alone.",
    },
    {
      invariantKind: "departure",
      statement: "A row beside the same page spelling another phase counts nowhere here.",
    },
    {
      invariantKind: "departure",
      statement: "The runs are gathered under the opening of the first line the agent wrote.",
    },
    {
      invariantKind: "departure",
      statement: "A first line past the width a column holds is shortened to that width.",
    },
    {
      invariantKind: "departure",
      statement: "Two calls opening their first line alike are gathered as one row.",
    },
    {
      invariantKind: "departure",
      statement: "A row is written by the wrapper the weighing hook reads into a call.",
    },
    {
      invariantKind: "departure",
      statement: "The processor time recorded is what the call's children spent and so the call's.",
    },
    {
      invariantKind: "departure",
      statement: "A run that noted no high-water mark is left out of the memory reported.",
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
      statement: "A first line holding no run of what was chosen is not listed at all.",
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
      statement: "Calls are ordered by what their runs took on average.",
    },
    {
      invariantKind: "departure",
      statement: "Calls taking equal processor time are ordered by name.",
    },
    {
      invariantKind: "absence",
      statement: "A row here records no refusal.",
    },
    {
      invariantKind: "absence",
      statement: "A run writes no value the commit has.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here makes a call.",
    },
    {
      invariantKind: "departure",
      statement: "An argument this command does not take is refused.",
    },
  ],
  name: "call",
  arguments: [{ argument: "argument/run-window" }],
} as const satisfies Command
