import type { Module } from "@akasha/code-system/module"

export const migrationCheckedLanding = {
  id: "01a06892-51f8-74ee-adcf-6b203defb844",
  pageTypeSlug: "module",
  slug: "migration-checked-landing",
  definition:
    "a migration landing the checks judge, for the batches that take a file away or put up a page",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A batch that takes a file away is judged before that file goes.",
    },
    {
      invariantKind: "departure",
      statement: "A batch that puts up a page is judged before that page stands.",
    },
    {
      invariantKind: "departure",
      statement:
        "A batch that only writes over files already standing lands as a mechanical landing lands.",
    },
    {
      invariantKind: "departure",
      statement: "Whether a batch takes anything away is read off the bodies composed.",
    },
    {
      invariantKind: "departure",
      statement:
        "Whether a batch puts up a page is read off the bodies composed and what stands at the root.",
    },
    {
      invariantKind: "departure",
      statement: "A body naming a path a file already stands at puts up no page.",
    },
    {
      invariantKind: "departure",
      statement: "A page put up outside `akasha/` is judged by no check.",
    },
    {
      invariantKind: "departure",
      statement: "A batch putting up pages only outside `akasha/` lands mechanically.",
    },
    {
      invariantKind: "departure",
      statement: "A migration owes no reading for what a program composed.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides which files a migration takes away.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here composes the part line a page put up is named by.",
    },
  ],
} as const satisfies Module
