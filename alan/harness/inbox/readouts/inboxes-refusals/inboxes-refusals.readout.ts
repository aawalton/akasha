import type { Readout } from "akasha/alan/harness/readout/readout.page-type.types.ts"

export const inboxesRefusals = {
  id: "01a0d935-6403-7509-84a1-9e2bff2bf148",
  type: "page-type/readout",
  slug: "inboxes-refusals",
  definition: "how many definitions the grammar still refuses",
  label: "Refusals",
  unit: "refusals",
  place: 6,
  scale: "readout-scale/refusal-count",
  groups: ["readout-group/inboxes"],
  wireKey: "refusals",
  countedOn: "eso-day",
  countedFrom: "number-property/inbox-refusals",
  countName: "refusal count",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The count is the count the tracking day has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The count is how many definitions the grammar check refuses.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The refusals are the last inbox in the group.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A count of zero is a count.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No tracking day is no reading rather than a count of zero.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tracking day with no count is no reading rather than a count of zero.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here caches a reading.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here decides when a reading is taken.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here turns a count into a color.",
    },
  ],
} as const satisfies Readout
