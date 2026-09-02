import type { Readout } from "../../readout.page-type.ts"

export const inboxesTexts = {
  id: "01a063bd-a526-7d01-b1be-d6979e8b8c1f",
  pageTypeSlug: "readout",
  slug: "inboxes-texts",
  definition: "how many unread texts are waiting",
  code: "ts",
  label: "Unread texts",
  unit: "texts",
  place: 4,
  figureFormat: "integer",
  scaleSlug: "daily-inbox",
  earnedKey: "inbox-texts-cleared-today",
  groupSlugs: ["inboxes"],
  wireKey: "texts",
  querySlug: "inbox-readings-on-day",
  queryKey: "inbox-texts",
  enabled: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "Alan ruled this reading keeps a page and leaves the strip.",
    },
    {
      invariantKind: "departure",
      statement: "The count is the one the tracking day carries for the day asked for.",
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
      statement: "No tracking day is no reading rather than a count of zero.",
    },
    {
      invariantKind: "departure",
      statement: "A store that refuses is a fault rather than a reading of nothing.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here caches a reading or decides when a reading is taken.",
    },
  ],
} as const satisfies Readout
