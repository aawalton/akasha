import type { Readout } from "akasha/alan/harness/readout/readout.page-type.types.ts"

export const inboxesFindings = {
  id: "01a0d478-0472-7189-9cdb-5ede424fdaaa",
  type: "page-type/readout",
  slug: "inboxes-findings",
  definition: "how many findings are waiting",
  label: "Findings",
  unit: "findings",
  scale: "readout-scale/inbox-count",
  groups: [{ group: "readout-group/inboxes", place: 4 }],
  wireKey: "findings",
  servedBy: ["module/inbox-reading", "service-workstation/inbox-relay-service"],
  countedOn: "eso-day",
  countedFrom: "number-property/inbox-findings",
  countName: "finding count",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The count is the count the tracking day has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The count is how many finding pages there are, whatever domain each is of.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The findings come just before the gaps in the group.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A count stated as text is read as the number that count spells.",
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
  carriedTo: ["router-app/alan-web"],
  createdAt: "2026-09-24T17:30:30.386Z",
  updatedAt: "2026-10-18T13:28:15.838Z",
} as const satisfies Readout
