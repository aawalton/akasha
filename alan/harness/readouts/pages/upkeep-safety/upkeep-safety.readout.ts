import type { Readout } from "akasha/alan/harness/readouts/readout.page-type.types.ts"

export const upkeepSafety = {
  id: "01a05f42-92f5-7004-9179-75f0f75b02e9",
  type: "readout",
  slug: "upkeep-safety",
  definition: "how safe the place Alan is in",
  reading: {},
  label: "Safety",
  unit: "levels",
  place: 1,
  scale: "readout-scale/safety-level",
  groups: ["readout-group/upkeep", "readout-group/safety"],
  wireKey: "safety",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The level now is the level the open tracking session has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The level a day has is the last level that day's sessions have.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A session with no level is passed over rather than read as the day's level.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A day no session has a level on is no reading rather than a level of zero.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A level moves in half steps.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A level below zero is a level.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A level stated as text is read as the number that level spells.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "No open session is no reading rather than a level of zero.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An open session with no level is no reading rather than a level of zero.",
    },

    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here caches a reading or decides when a reading is taken.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here turns a level into a color.",
    },
  ],
} as const satisfies Readout
