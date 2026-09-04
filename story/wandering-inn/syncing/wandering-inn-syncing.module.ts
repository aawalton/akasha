import type { Module } from "@akasha/code-system/module"

export const wanderingInnSyncing = {
  id: "01a0686a-7a57-76d6-a2df-a5aa6fbe7d58",
  pageTypeSlug: "module",
  slug: "wandering-inn-syncing",
  definition: "every chapter the wandering inn lists read and filed under the story",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The story the chapters are filed under is there before any chapter is read.",
    },
    {
      invariantKind: "departure",
      statement: "A chapter already filed is known by the link it was filed under.",
    },
    {
      invariantKind: "departure",
      statement:
        "A chapter marked as patron early access by its title or by its page body is left.",
    },
    {
      invariantKind: "departure",
      statement:
        "A chapter holding no prose once the trailing navigation is stripped is left rather than filed empty.",
    },
    {
      invariantKind: "departure",
      statement: "A chapter's title is the page's own title where the page carries a title.",
    },
    {
      invariantKind: "departure",
      statement:
        "A chapter's title is the contents listing's title where the page carries no title.",
    },
    {
      invariantKind: "departure",
      statement: "A second stands between one chapter read and the next.",
    },
    {
      invariantKind: "departure",
      statement: "The site is closed whether the run finished or threw.",
    },
    {
      invariantKind: "departure",
      statement: "A chapter that failed is counted and the run carries on to the next chapter.",
    },
    {
      invariantKind: "departure",
      statement: "A run that files nothing is still recorded as a run that happened.",
    },
    {
      invariantKind: "departure",
      statement: "A run that only says what the run would file is not recorded as a run.",
    },
  ],
} as const satisfies Module
