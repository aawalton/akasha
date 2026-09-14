import type { Readout } from "akasha/alan/harness/readouts/readout.page-type.types.ts"

export const workstationMemory = {
  id: "01a0a065-1fe2-7ef7-8efc-0759f66b9875",
  type: "readout",
  slug: "workstation-memory",
  definition: "how much of the workstation's memory is in use",
  reading: {},
  label: "Memory",
  unit: "percent",
  place: 2,
  drawnAs: "number",
  groups: ["workstation"],
  wireKey: "memory",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The reading is the share of memory the kernel says is not available.",
    },
    {
      invariantKind: "departure",
      statement: "Memory the kernel could reclaim counts as available rather than in use.",
    },
    {
      invariantKind: "departure",
      statement: "A meminfo naming no total or no available memory is no reading rather than zero.",
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
