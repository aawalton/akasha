import type { Module } from "@akasha/code-system/module"

export const checkMeasuring = {
  id: "01a0735c-1733-7951-92bb-c79e18a063a2",
  pageTypeSlug: "module",
  slug: "check-measuring",
  definition:
    "the processor time and memory a check's runs took in the last twenty-four hours, split by phase",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A check's runs are read from the entries beside that check's page.",
    },
    {
      invariantKind: "departure",
      statement: "The window is the twenty-four hours ending at the moment of asking.",
    },
    {
      invariantKind: "departure",
      statement: "A run exactly twenty-four hours old is counted.",
    },
    {
      invariantKind: "departure",
      statement: "A run older than that is not counted.",
    },
    {
      invariantKind: "departure",
      statement: "A run stamped after the moment of asking is not counted.",
    },
    {
      invariantKind: "departure",
      statement: "A run whose time cannot be read is not counted.",
    },
    {
      invariantKind: "departure",
      statement: "The window the numbers cover is said with the table.",
    },
    {
      invariantKind: "departure",
      statement: "A run's processor time is that run's own together with the children it reaped.",
    },
    {
      invariantKind: "departure",
      statement:
        "A run's memory is the bytes that run added over the memory resident when it opened.",
    },
    {
      invariantKind: "departure",
      statement: "A run that forgot no high-water mark is left out of a memory average.",
    },
    {
      invariantKind: "departure",
      statement: "That run is counted in a processor average all the same.",
    },
    {
      invariantKind: "departure",
      statement: "That run is counted among the runs its phase holds all the same.",
    },
    {
      invariantKind: "departure",
      statement: "A patch run judges the paths a change carries.",
    },
    {
      invariantKind: "departure",
      statement: "An audit run judges every page.",
    },
    {
      invariantKind: "departure",
      statement: "An average is the total a phase's runs took shared out over how many there were.",
    },
    {
      invariantKind: "departure",
      statement: "How many runs a phase holds is said beside that phase's averages.",
    },
    {
      invariantKind: "departure",
      statement: "A phase no run was judged at carries no average rather than an average of zero.",
    },
    {
      invariantKind: "departure",
      statement: "A phase no run was judged at holds a count of zero rather than no count.",
    },
    {
      invariantKind: "departure",
      statement: "A count of bytes is rounded to the whole byte before that count is scaled.",
    },
    {
      invariantKind: "departure",
      statement:
        "Checks are ordered by the processor time their patch runs took on average, the longest first.",
    },
    {
      invariantKind: "departure",
      statement: "A check carrying no patch run is ordered after every check carrying one.",
    },
    {
      invariantKind: "departure",
      statement: "Checks taking equal processor time are ordered by name.",
    },
    {
      invariantKind: "departure",
      statement: "A run naming a phase this does not split by is counted beneath the table.",
    },
    {
      invariantKind: "departure",
      statement: "Entries that could not be read are named beneath the table.",
    },
    {
      invariantKind: "departure",
      statement: "A check holding no run within the window is not answered.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes.",
    },
  ],
} as const satisfies Module
