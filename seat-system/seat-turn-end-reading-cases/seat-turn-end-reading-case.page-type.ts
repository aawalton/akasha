import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { CaseFinalMessage } from "./properties/case-final-message.text-property.ts"
import type { CasePrompt } from "./properties/case-prompt.text-property.ts"

export type SeatTurnEndReadingCase = Page & {
  casePrompt: CasePrompt
  caseFinalMessage: CaseFinalMessage
}

export const seatTurnEndReadingCase = {
  id: "01a06837-f101-7187-9f0a-b7d087883e40",
  pageTypeSlug: "page-type",
  slug: "seat-turn-end-reading-case",
  definition: "one turn end kept beside the answer the turn end is owed",
  pluralSlug: "seat-turn-end-reading-cases",
  extendsSlug: ["page-type/page"],
  partSlugs: ["text-property/case-final-message", "text-property/case-prompt"],
  properties: [
    { pagePropertySlug: "case-prompt", required: true, many: false },
    { pagePropertySlug: "case-final-message", required: true, many: false },
  ],
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
      invariantKind: "departure",
      statement: "The prompt and the final message a case keeps are properties of the case.",
    },
  ],
} as const satisfies PageType
