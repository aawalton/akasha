import type { Readout } from "akasha/alan/harness/readout/readout.page-type.types.ts"

export const inboxesEmail = {
  id: "01a06230-b155-7d69-9e39-eb26b5607d9e",
  type: "page-type/readout",
  slug: "inboxes-email",
  definition: "how near Alan's mail came to empty today",
  label: "Email",
  unit: "messages",
  scale: "readout-scale/inbox-count",
  groups: [{ group: "readout-group/inboxes", place: 1 }],
  wireKey: "email",
  servedBy: ["module/inbox-reading", "service-workstation/inbox-relay-service"],
  countedOn: "opened-day",
  countedFrom: "number-property/lowest-email-inbox-count",
  countName: "lowest mail count",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The reading is the count the day's own page has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The reading is how near the inbox came to empty rather than where the inbox is.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "No day written down is no reading rather than a count of zero.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day with no count is no reading rather than a count of zero.",
    },

    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here caches a reading or decides when a reading is taken.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here turns a count into a color.",
    },
  ],
  carriedTo: ["router-app/alan-web"],
  createdAt: "2026-09-02T12:55:53.429Z",
  updatedAt: "2026-10-18T13:28:15.838Z",
} as const satisfies Readout
