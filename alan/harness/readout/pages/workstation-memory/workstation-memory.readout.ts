import type { Readout } from "akasha/alan/harness/readout/readout.page-type.types.ts"

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
      invariantKind: "invariant-kind/departure",
      statement: "The reading is the gigabytes of memory the kernel says are available.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A gigabyte here is a kernel kilobyte over a thousand and twenty-four squared.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Memory the kernel could reclaim counts as available rather than as gone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reading is kept to a tenth of a gigabyte.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "How much memory the workstation has in all is no part of the reading.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A meminfo naming no available memory is no reading rather than zero.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here caches a reading or decides when a reading is taken.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here turns a share into a color.",
    },
  ],
} as const satisfies Readout
