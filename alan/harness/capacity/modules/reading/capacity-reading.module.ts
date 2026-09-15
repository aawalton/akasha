import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const capacityReading = {
  id: "01a069ba-b018-7b6b-b9a6-18cd82bd54b3",
  type: "module",
  slug: "capacity-reading",
  definition: "the stress capacity Alan's stretches leave him, kept on the capacity readout",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The reading is taken on the workstation with the checkout.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The capacity is kept beside the readout the capacity was taken for.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The day is reached through the one module saying where a day is kept.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The day read is the day Alan opened rather than the day on the clock.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The stretches are reached through the module saying where a day is kept.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "How to read a stretch's capacity is on the readout's own page.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "The daily tracking declares no capacity key on a day row.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The capacity is `health-capacity-hours` on each stretch filed beside the day.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A day's capacity is a sum over that day's stretches.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each stretch's capacity hours are worked out by the readout's own code.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Summing the stretches is the only arithmetic this module does.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stretch is filed under the day's id rather than under the day's date.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The stretches are asked for in a read of their own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The day is read before the stretches filed under the day's id.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A day nobody has opened is no reading rather than a capacity of zero.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stretch with no capacity is left out of the sum.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A day where no stretch has a capacity is no reading.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The keys a stretch answers with are spelled back to the spelling the store keeps.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The guard summing the capacity is akasha's own rather than a guard rewritten here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run of this file takes a reading.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The root read is the root the environment states or the folder the call was made in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An empty value in the environment states no root.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Where the readout's page sits is asked of the index rather than spelled.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "The capacity itself is never printed.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Importing this file takes no reading.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here decides when a reading is due.",
    },
  ],
} as const satisfies Module
