import type { Readout } from "akasha/alan/harness/readout/readout.page-type.types.ts"

export const workstationMemory = {
  id: "01a0a065-1fe2-7ef7-8efc-0759f66b9875",
  type: "page-type/readout",
  slug: "workstation-memory",
  definition: "the memory the kernel of the workstation can give",
  reading: {},
  label: "Memory",
  unit: "gigabytes",
  drawnAs: "number",
  groups: [{ group: "readout-group/workstation", place: 2 }],
  wireKey: "memory",
  servedBy: ["module/workstation-load-sampling"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The number is the gigabytes of memory the kernel says are available.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A gigabyte here is a kernel kilobyte over a thousand and twenty-four squared.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Memory the kernel could reclaim counts as available rather than as gone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A number is kept to a tenth of a gigabyte.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "How much memory the workstation has in all is no part of the number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A meminfo naming no available memory is no number rather than zero.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here caches a number or decides when a number is taken.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here turns a share into a color.",
    },
  ],
  createdAt: "2026-09-14T14:49:36.994Z",
  updatedAt: "2026-10-30T17:20:30.787Z",
} as const satisfies Readout
