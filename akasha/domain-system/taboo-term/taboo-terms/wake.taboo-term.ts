import type { TabooTerm } from "../taboo-term.page-type.ts"

export const wake = {
  id: "01a0593e-da43-7af8-992a-9a0a58be265f",
  pageTypeSlug: "taboo-term",
  slug: "wake",
  tabooSenses: [
    {
      sense: "a message that earned the start of a stopped seat",
      instead: "any message starts one",
    },
  ],
} as const satisfies TabooTerm
