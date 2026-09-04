import type { FileProperty } from "@akasha/pages-system/file-property"

export type QuestionContext = "txt"

export const questionContext = {
  id: "01a06823-89b2-7008-be90-ba24ce4e692b",
  pageTypeSlug: "file-property",
  slug: "question-context",
  propertySlug: "context",
  definition: "what the persona set out around a question so Alan could answer it",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The context is what Alan reads before the ask rather than part of the ask.",
    },
    {
      invariantKind: "departure",
      statement: "A question stands without context where the ask carries itself.",
    },
  ],
} as const satisfies FileProperty
