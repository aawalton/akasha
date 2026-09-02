import type { Readout } from "../../readout.page-type.ts"

export const inboxesTexts = {
  id: "01a06230-b156-7e6f-b442-300e66ba02ab",
  pageTypeSlug: "readout",
  slug: "inboxes-texts",
  definition: "how many texts are unread",
  code: "ts",
  test: "ts",
  label: "Unread texts",
  unit: "texts",
  place: 4,
  figureFormat: "integer",
  scaleSlug: "daily-inbox",
  earnedKey: "inbox-texts-cleared-today",
  groupSlugs: ["inboxes"],
  wireKey: "texts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The count is the one the tracking day carries for the day asked for.",
    },
    {
      invariantKind: "departure",
      statement: "The count is how many texts are unread at the end of that day.",
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
      statement: "A tracking day carrying no count is no reading rather than a count of zero.",
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
