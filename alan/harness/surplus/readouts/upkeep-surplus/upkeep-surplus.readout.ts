import type { Readout } from "akasha/alan/harness/readout/readout.page-type.types.ts"

export const upkeepSurplus = {
  id: "01a05fc3-145a-78a6-902f-ea39b8165c39",
  type: "page-type/readout",
  slug: "upkeep-surplus",
  definition: "the hours of sleep a day keeps after the hours the day spends",
  reading: {},
  label: "Surplus",
  unit: "hours",
  scale: "readout-scale/surplus-hours",
  groups: [
    { group: "readout-group/upkeep", place: 2 },
    { group: "readout-group/surplus", place: 1 },
    { group: "readout-group/resources", place: 1 },
  ],
  wireKey: "surplus",
  servedBy: ["module/surplus-reading", "service-workstation/surplus-relay-service"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The number this readout shows is the surplus the tracking day has for the day asked for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The surplus a day has is the day's sleep less the day's spend.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A surplus below zero is a number this readout shows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A surplus given as text is read as the number that text spells.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "No tracking day yet, or a tracking day with neither sleep nor spend yet, reads a surplus of zero.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A surplus falls with the clock while a stretch of the day is still running.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "How fast it falls is the sum of what an hour of each running stretch costs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A running stretch whose hour costs nothing has the surplus fall at nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The cost of an hour is read from the one module the day's spend reads it from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stretch with no end is the stretch running now.",
    },

    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here caches a number or decides when a number is taken.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here turns a surplus into a color.",
    },
  ],
  carriedTo: ["router-app/alan-web", "router-app/smilingjenny-web"],
  madeFrom: "day-row-and-stretches",
  createdAt: "2026-09-02T01:36:55.386Z",
  updatedAt: "2026-10-30T17:29:24.105Z",
} as const satisfies Readout
