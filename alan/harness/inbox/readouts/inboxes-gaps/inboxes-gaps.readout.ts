import type { Readout } from "akasha/alan/harness/readout/readout.page-type.types.ts"

export const inboxesGaps = {
  id: "01a0d4e7-cbcc-7719-93ec-dc6e638d9353",
  type: "page-type/readout",
  slug: "inboxes-gaps",
  definition: "how many gaps are left",
  label: "Gaps",
  unit: "gaps",
  scale: "readout-scale/inbox-count",
  groups: [{ group: "readout-group/inboxes", place: 5 }],
  wireKey: "gaps",
  servedBy: ["module/inbox-reading", "service-workstation/inbox-relay-service"],
  countedOn: "eso-day",
  countedFrom: "number-property/inbox-gaps",
  countName: "gap count",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The count is the count the tracking day has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The count is how many gaps the pages state, as the gaps panel counts them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The gaps come just before the refusals in the group.",
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
  createdAt: "2026-09-24T19:32:35.916Z",
  updatedAt: "2026-10-18T13:28:15.838Z",
} as const satisfies Readout
