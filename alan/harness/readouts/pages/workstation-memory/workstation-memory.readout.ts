import type { Readout } from "akasha/alan/harness/readouts/readout.page-type.types.ts"

export const workstationMemory = {
  id: "01a0a065-1fe2-7ef7-8efc-0759f66b9875",
  type: "readout",
  slug: "workstation-memory",
  definition: "how much memory the kernel says the workstation still has to give",
  reading: {},
  label: "Memory",
  unit: "gigabytes",
  place: 2,
  drawnAs: "number",
  groups: ["readout-group/workstation"],
  wireKey: "memory",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The reading is the gigabytes of memory the kernel says are available.",
    },
    {
      invariantKind: "departure",
      statement: "A gigabyte here is a kernel kilobyte over a thousand and twenty-four squared.",
    },
    {
      invariantKind: "departure",
      statement: "Memory the kernel could reclaim counts as available rather than as gone.",
    },
    {
      invariantKind: "departure",
      statement: "A reading is kept to a tenth of a gigabyte.",
    },
    {
      invariantKind: "departure",
      statement: "How much memory the workstation has in all is no part of the reading.",
    },
    {
      invariantKind: "departure",
      statement: "A meminfo naming no available memory is no reading rather than zero.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here caches a reading or decides when a reading is taken.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here turns a share into a color.",
    },
  ],
} as const satisfies Readout
