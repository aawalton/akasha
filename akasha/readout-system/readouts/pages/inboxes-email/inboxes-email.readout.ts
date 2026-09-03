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
  figureFormat: "integer",
  scaleSlug: "lowest-inbox-count",
  groupSlugs: ["inboxes"],
  wireKey: "email",
  querySlug: "email-entry-lowest-inbox-count-today",
  queryKey: "lowestInboxCount",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The reading is the count the day's mail entry carries.",
    },
    {
      invariantKind: "departure",
      statement: "The reading is how near the inbox came to empty rather than where the inbox is.",
    },
    {
      invariantKind: "departure",
      statement: "A count stated as text is read as the number that count spells.",
    },
    {
      invariantKind: "departure",
      statement: "A count of zero is a count.",
    },
    {
      invariantKind: "departure",
      statement: "No mail entry is no reading rather than a count of zero.",
    },
    {
      invariantKind: "departure",
      statement: "A mail entry carrying no count is no reading rather than a count of zero.",
    },
    {
      invariantKind: "departure",
      statement: "A store that refuses is a fault rather than a reading of nothing.",
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
