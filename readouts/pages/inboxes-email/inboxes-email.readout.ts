import type { Readout } from "../../readout.page-type.ts"

export const inboxesEmail = {
  id: "01a06230-b155-7d69-9e39-eb26b5607d9e",
  pageTypeSlug: "readout",
  slug: "inboxes-email",
  definition: "how near Alan's mail came to empty today",
  code: "ts",
  test: "ts",
  label: "Email",
  unit: "messages",
  place: 1,
  scale: "lowest-inbox-count",
  groups: ["inboxes"],
  wireKey: "email",
  querySlug: "day-lowest-email-inbox-count-today",
  queryKey: "lowestEmailInboxCount",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The reading is the count the day's own page has.",
    },
    {
      invariantKind: "departure",
      statement: "The reading is how near the inbox came to empty rather than where the inbox is.",
    },

    {
      invariantKind: "departure",
      statement: "No day written down is no reading rather than a count of zero.",
    },
    {
      invariantKind: "departure",
      statement: "A day with no count is no reading rather than a count of zero.",
    },

    {
      invariantKind: "absence",
      statement: "Nothing here caches a reading or decides when a reading is taken.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here turns a count into a color.",
    },
  ],
} as const satisfies Readout
