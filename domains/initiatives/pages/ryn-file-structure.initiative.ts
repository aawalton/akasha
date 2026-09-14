import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const rynFileStructure = {
  id: "01a09fef-e83b-7b93-9938-07b24a8de66b",
  type: "initiative",
  slug: "ryn-file-structure",
  domain: "domain/file",
  persona: "ryn",
  intents: [
    {
      statement: "No page states a plural slug.",
    },
    {
      statement: "A folder is named in the singular.",
    },
  ],
  constraints: [
    "A page listing is reached at its page type's slug.",
    "A folder's name drops the prefix the folder above it already says.",
  ],
} as const satisfies Initiative
