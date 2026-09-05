import type { Module } from "@akasha/code-system/module"

export const checkMeasuring = {
  id: "01a0735c-1733-7951-92bb-c79e18a063a2",
  pageTypeSlug: "module",
  slug: "check-measuring",
  definition:
    "how much processor time and memory each check's runs took, split by the phase judged at",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A check's runs are read from the entries beside that check's page.",
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
      statement: "A run that forgot no high-water mark is left out of a memory median.",
    },
    {
      invariantKind: "departure",
      statement: "That run is counted in a processor median all the same.",
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
      statement: "A median of an even count of runs is the mean of the two middle runs.",
    },
    {
      invariantKind: "departure",
      statement: "A phase no run was judged at carries no median rather than a median of zero.",
    },
    {
      invariantKind: "departure",
      statement: "Checks are ordered by what their patch runs took, the longest first.",
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
      statement: "A check whose page holds no entries is not answered.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes.",
    },
  ],
} as const satisfies Module
