import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const capacityReading = {
  id: "01a069ba-b018-7b6b-b9a6-18cd82bd54b3",
  pageTypeSlug: "module",
  slug: "capacity-reading",
  definition: "the stress capacity Alan's stretches leave him, kept on the capacity readout",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The reading is taken on the workstation carrying the checkout.",
    },
    {
      invariantKind: "departure",
      statement: "The capacity is kept beside the readout the capacity was taken for.",
    },
    {
      invariantKind: "departure",
      statement: "The day is reached through the one module saying where a day is kept.",
    },
    {
      invariantKind: "departure",
      statement: "The stretches are reached through the module saying where a day is kept.",
    },
    {
      invariantKind: "departure",
      statement: "What to ask and how to read the answer are on the readout's own page.",
    },
    {
      invariantKind: "absence",
      statement: "The daily tracking declares no capacity key on a day row.",
    },
    {
      invariantKind: "departure",
      statement: "The capacity is `health-capacity-hours` on each stretch filed beside the day.",
    },
    {
      invariantKind: "departure",
      statement: "A day's capacity is a sum over that day's stretches.",
    },
    {
      invariantKind: "departure",
      statement: "Each stretch's capacity hours are worked out by the store rather than here.",
    },
    {
      invariantKind: "departure",
      statement: "Summing the stretches is the only arithmetic this module does.",
    },
    {
      invariantKind: "departure",
      statement: "A stretch is filed under the day's id rather than under the day's date.",
    },
    {
      invariantKind: "departure",
      statement: "The stretches are asked for in a read of their own.",
    },
    {
      invariantKind: "departure",
      statement: "The day is read before the stretches filed under the day's id.",
    },
    {
      invariantKind: "departure",
      statement: "A day nobody has opened is no reading rather than a capacity of zero.",
    },
    {
      invariantKind: "departure",
      statement: "A stretch carrying no capacity is left out of the sum.",
    },
    {
      invariantKind: "departure",
      statement: "A day where no stretch carries a capacity is no reading.",
    },
    {
      invariantKind: "departure",
      statement:
        "The keys a stretch answers with are spelled back to the spelling the store keeps.",
    },
    {
      invariantKind: "departure",
      statement: "The guard summing the capacity is akasha's own rather than one rewritten here.",
    },
    {
      invariantKind: "departure",
      statement: "A run of this file takes a reading.",
    },
    {
      invariantKind: "departure",
      statement: "The root read is the one the environment states or the one the call was made in.",
    },
    {
      invariantKind: "stopgap",
      statement: "The readout's path is spelled here rather than asked of the index.",
    },
    {
      invariantKind: "absence",
      statement: "The capacity itself is never printed.",
    },
    {
      invariantKind: "absence",
      statement: "Importing this file takes none.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides when a reading is due.",
    },
  ],
} as const satisfies Module
