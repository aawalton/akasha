import type { Module } from "@akasha/code-system/module"

export const migrationCheckedLanding = {
  id: "01a06892-51f8-74ee-adcf-6b203defb844",
  pageTypeSlug: "module",
  slug: "migration-checked-landing",
  definition: "a migration landing the checks judge, for the batches that take files away",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A batch that takes a file away is judged before that file goes.",
    },
    {
      invariantKind: "departure",
      statement: "A batch that only writes lands as a mechanical landing lands.",
    },
    {
      invariantKind: "departure",
      statement: "Whether a batch takes anything away is read off the bodies composed.",
    },
    {
      invariantKind: "departure",
      statement: "A migration owes no reading for what a program composed.",
    },
    {
      invariantKind: "constraint",
      statement: "Only a path under akasha reaches a check.",
    },
    {
      invariantKind: "constraint",
      statement: "A path outside akasha is judged by no check.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides which files a migration takes away.",
    },
  ],
} as const satisfies Module
