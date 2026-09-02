import type { Module } from "@akasha/code-system/module"

export const upstreamLibraries = {
  id: "01a06038-2cbf-7931-aedd-7a1b9a4637c4",
  pageTypeSlug: "module",
  slug: "upstream-libraries",
  definition: "which community ESO libraries temper copies data out of",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A library is named by the slug a caller spells on the command line.",
    },
    {
      invariantKind: "departure",
      statement: "Each library names the package its copied data is written into.",
    },
    {
      invariantKind: "departure",
      statement: "Each library names the upstream files its data is read out of.",
    },
    {
      invariantKind: "departure",
      statement: "Those files are named against the addons directory rather than as whole paths.",
    },
    {
      invariantKind: "departure",
      statement: "A name that is no library is answered as no library rather than refused here.",
    },
    {
      invariantKind: "departure",
      statement: "A copy differing from upstream is told apart from a run that broke.",
    },
  ],
} as const satisfies Module
