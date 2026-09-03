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
      statement: "The story the chapters are filed under stands before any chapter is read.",
    },
    {
      invariantKind: "departure",
      statement: "A chapter already filed is known by the link it was filed under.",
    },
    {
      invariantKind: "departure",
      statement:
        "A chapter marked as patron early access, by its title or by what stands on its page, is left.",
    },
    {
      invariantKind: "departure",
      statement:
        "A chapter holding no prose once the trailing navigation is stripped is left rather than filed empty.",
    },
    {
      invariantKind: "departure",
      statement:
        "A chapter's title is taken from the page's own title where the page states one, and from the contents listing otherwise.",
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
      statement: "A run that failed a chapter is a failed run however much else it filed.",
    },
    {
      invariantKind: "departure",
      statement: "A run that files nothing is still recorded as a run that happened.",
    },
    {
      invariantKind: "departure",
      statement: "A run that only says what it would file is not recorded as a run.",
    },
    {
      invariantKind: "gap",
      statement:
        "Chapters are filed by reaching the pages data directly, as code on the workstation must, rather than through the pages system service.",
    },
  ],
} as const satisfies Module
