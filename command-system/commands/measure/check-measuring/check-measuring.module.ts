import type { Module } from "@akasha/code/module"

export const checkMeasuring = {
  id: "01a0735c-1733-7951-92bb-c79e18a063a2",
  pageTypeSlug: "module",
  slug: "check-measuring",
  definition: "the processor time and memory the check runs a caller chose took, split by phase",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A check's runs are read from the entries beside that check's page.",
    },
    {
      invariantKind: "departure",
      statement: "A record's run is the run id that record carries.",
    },
    {
      invariantKind: "departure",
      statement: "A record carrying no run id belongs to no run.",
    },
    {
      invariantKind: "departure",
      statement: "A caller naming no choice reads the last one run.",
    },
    {
      invariantKind: "departure",
      statement: "A count says how many runs are read.",
    },
    {
      invariantKind: "departure",
      statement: "The runs a count reads are the newest runs.",
    },
    {
      invariantKind: "departure",
      statement: "Runs are ranked by the latest moment any record of that run carries.",
    },
    {
      invariantKind: "departure",
      statement: "A record belonging to no run is counted nowhere where runs were counted.",
    },
    {
      invariantKind: "departure",
      statement: "A caller naming a period reads every record stamped within that period.",
    },
    {
      invariantKind: "departure",
      statement: "A period ends at the moment of asking.",
    },
    {
      invariantKind: "departure",
      statement: "A record carrying no run id is counted where a period was named.",
    },
    {
      invariantKind: "departure",
      statement: "A record stamped exactly a period's length ago is counted.",
    },
    {
      invariantKind: "departure",
      statement: "A record stamped before a period opened is not counted.",
    },
    {
      invariantKind: "departure",
      statement: "A record stamped after the moment of asking is not counted.",
    },
    {
      invariantKind: "departure",
      statement: "A record whose time cannot be read is not counted.",
    },
    {
      invariantKind: "departure",
      statement: "A period is named in minutes or in hours or in days.",
    },
    {
      invariantKind: "departure",
      statement: "A count of no runs is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A flag nothing follows is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A word this module reads as neither a count nor a period is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names the forms a choice is written in.",
    },
    {
      invariantKind: "departure",
      statement: "The patch runs are read where no phase was named.",
    },
    {
      invariantKind: "departure",
      statement: "The audit runs are read in their place where the audit flag was named.",
    },
    {
      invariantKind: "departure",
      statement: "The audit flag said twice is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A run of a phase that was not read counts nowhere in the table.",
    },
    {
      invariantKind: "departure",
      statement:
        "A run's processor time is that run's own together with the children that run reaped.",
    },
    {
      invariantKind: "departure",
      statement:
        "A run's memory is the bytes that run added over the memory resident when that run opened.",
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
      statement:
        "An average is the total a phase's runs took shared out over the count of those runs.",
    },
    {
      invariantKind: "departure",
      statement: "The count of runs a phase holds is said beside that phase's averages.",
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
      statement: "The total counts the distinct runs of a phase rather than the records read.",
    },
    {
      invariantKind: "departure",
      statement: "The total shares a phase's processor time over the distinct runs of that phase.",
    },
    {
      invariantKind: "departure",
      statement: "A peak of memory is added to no other peak.",
    },
    {
      invariantKind: "departure",
      statement: "The total draws its memory as absent.",
    },
    {
      invariantKind: "departure",
      statement: "A count of bytes is rounded to the whole byte before that count is scaled.",
    },
    {
      invariantKind: "departure",
      statement: "Checks are ordered by falling average processor time of their patch runs.",
    },
    {
      invariantKind: "departure",
      statement: "A check carrying no patch run is ordered after every check carrying a patch run.",
    },
    {
      invariantKind: "departure",
      statement: "Checks taking equal processor time are ordered by name.",
    },
    {
      invariantKind: "departure",
      statement: "A run naming a phase the table does not split by is counted beneath the table.",
    },
    {
      invariantKind: "departure",
      statement: "Entries that could not be read are named beneath the table.",
    },
    {
      invariantKind: "departure",
      statement: "A check holding no run the choice reached is not answered.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes.",
    },
  ],
} as const satisfies Module
