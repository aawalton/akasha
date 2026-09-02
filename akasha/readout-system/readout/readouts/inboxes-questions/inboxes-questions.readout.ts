import type { Readout } from "../../readout.page-type.ts"

export const inboxesQuestions = {
  id: "01a06230-b156-7aad-89d8-f172419535eb",
  pageTypeSlug: "readout",
  slug: "inboxes-questions",
  definition: "how many questions are open across the fleet",
  code: "ts",
  test: "ts",
  label: "Questions",
  unit: "questions",
  place: 5,
  figureFormat: "integer",
  scaleSlug: "live-count",
  groupSlugs: ["inboxes"],
  wireKey: "questions",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The reading is how many question pages are open.",
    },
    {
      invariantKind: "departure",
      statement: "The reading is how many rows answered rather than a number read off one row.",
    },
    {
      invariantKind: "departure",
      statement: "No day bounds the count.",
    },
    {
      invariantKind: "departure",
      statement: "An open question is open whatever the day.",
    },
    {
      invariantKind: "departure",
      statement: "No open question is a reading of zero rather than no reading.",
    },
    {
      invariantKind: "departure",
      statement: "A store that refuses is a fault rather than a count of zero.",
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
