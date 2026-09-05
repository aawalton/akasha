import type { FileProperty } from "@akasha/pages/file-property"

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
      statement: "Alan reads the context before the ask rather than as part of the ask.",
    },
    {
      invariantKind: "departure",
      statement: "A question does without context where the ask carries itself.",
    },
  ],
} as const satisfies FileProperty
