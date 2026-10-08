import type { TabooTerm } from "akasha/domain/taboo-term/taboo-term.page-type.types.ts"

export const unrecorded = {
  id: "01a0593e-da41-74e9-b227-5dab951b1185",
  type: "page-type/taboo-term",
  slug: "unrecorded",
  pattern: "\\bunrecorded\\b",
  tabooSenses: [
    {
      sense: "a message row from before a warrant was kept on it",
      instead: "every sender states a warrant",
    },
  ],
  createdAt: "2026-08-31T19:14:46.465Z",
  updatedAt: "2026-09-15T17:45:26.000Z",
} as const satisfies TabooTerm
