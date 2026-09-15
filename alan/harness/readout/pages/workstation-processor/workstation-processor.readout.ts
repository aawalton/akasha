import type { Readout } from "akasha/alan/harness/readout/readout.page-type.types.ts"

export const workstationProcessor = {
  id: "01a0a065-0e31-7af0-bc57-e4bd83656aa1",
  type: "page-type/readout",
  slug: "workstation-processor",
  definition: "how much of the workstation's processor time is busy",
  reading: {},
  label: "Processor",
  unit: "percent",
  place: 1,
  drawnAs: "number",
  groups: ["readout-group/workstation"],
  wireKey: "processor",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The reading is the share of processor time that was not idle between two takes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Time spent waiting on a disk counts as idle.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Time a guest spent is counted once, under the time its host spent.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Two takes between which no processor time passed are no reading rather than zero.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A counter line that does not parse is no reading rather than zero.",
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
