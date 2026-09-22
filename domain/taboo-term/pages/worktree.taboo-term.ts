import type { TabooTerm } from "akasha/domain/taboo-term/taboo-term.page-type.types.ts"

export const worktree = {
  id: "01a0ca0b-8952-7d8d-861e-e7e27d25296b",
  type: "page-type/taboo-term",
  slug: "worktree",
  pattern: "(?<![a-z])work(?:trees?|(?:ing)? trees?)(?![a-z])",
  tabooSenses: [
    {
      sense: "the files a checkout holds on disk, as against what a commit holds",
      instead: "the files on disk, the checkout, or the checkout's files",
    },
  ],
} as const satisfies TabooTerm
