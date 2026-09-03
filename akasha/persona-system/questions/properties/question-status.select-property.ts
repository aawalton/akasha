import type { SelectProperty } from "@akasha/pages-system/select-property"

export const questionStatus = {
  id: "01a06823-89b2-7004-b653-99f4dc058a5c",
  pageTypeSlug: "select-property",
  slug: "question-status",
  propertySlug: "status",
  definition: "whether a question is still waiting on Alan, and how it stopped waiting",
  values: ["open", "answered", "dismissed"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An open question is waiting on Alan and on nobody else.",
    },
    {
      invariantKind: "departure",
      statement: "A dismissed question was let go rather than answered.",
    },
  ],
} as const satisfies SelectProperty

export type QuestionStatus = (typeof questionStatus.values)[number]
