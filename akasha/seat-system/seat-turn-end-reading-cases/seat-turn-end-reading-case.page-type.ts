import type { PageType } from "@akasha/pages-system/page-type"

export const seatTurnEndReadingCase = {
  id: "01a06837-f101-7187-9f0a-b7d087883e40",
  pageTypeSlug: "page-type",
  slug: "seat-turn-end-reading-case",
  definition: "one turn end kept beside the answer the turn end is owed",
  pluralSlug: "seat-turn-end-reading-cases",
  extendsSlug: "page-type/page",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A case stands whatever the reading later answers on it.",
    },
    {
      invariantKind: "departure",
      statement: "A case carries the evidence a reading is handed and nothing more.",
    },
    {
      invariantKind: "departure",
      statement: "A case says how the answer it is owed was settled.",
    },
    {
      invariantKind: "departure",
      statement: "A case replays from itself once the transcript it names has rolled away.",
    },
    {
      invariantKind: "departure",
      statement: "A case is owed one verdict rather than the question that reaches it.",
    },
    {
      invariantKind: "gap",
      statement: "The prompt and the final message a case keeps are properties of the case.",
    },
  ],
} as const satisfies PageType
