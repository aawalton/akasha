import type { TabooTerm } from "../taboo-term.page-type.ts"

export const unrecorded = {
  id: "01a0593e-da41-74e9-b227-5dab951b1185",
  pageTypeSlug: "taboo-term",
  slug: "unrecorded",
  pattern: "\\bunrecorded\\b",
  tabooSenses: [
    {
      sense: "a message row from before a warrant was kept on it",
      instead: "every sender states a warrant",
    },
  ],
} as const satisfies TabooTerm
