import type { ReadoutGroup } from "akasha/alan/harness/readouts/groups/readout-group.page-type.types.ts"

export const workstation = {
  id: "01a0a064-b4d5-73e0-9265-d1b2c0d51ad4",
  type: "readout-group",
  slug: "workstation",
  definition: "how hard Alan's workstation is working",
  parts: ["readout/workstation-memory", "readout/workstation-processor"],
  sortOrder: "place",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Each reading here is drawn as a number rather than as a stoplight.",
    },
    {
      invariantKind: "departure",
      statement: "A reading here is the workstation's own rather than one process's.",
    },
    {
      invariantKind: "departure",
      statement: "The processor reading here is a share and the memory reading an amount.",
    },
    {
      invariantKind: "departure",
      statement: "A reading here is drawn in the unit its own readout names.",
    },
  ],
} as const satisfies ReadoutGroup
