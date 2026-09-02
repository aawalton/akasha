import type { Module } from "@akasha/code-system/module"

export const addonUpdatePlan = {
  id: "01a06069-b78f-7b28-b528-03c2f328ce0c",
  pageTypeSlug: "module",
  slug: "addon-update-plan",
  definition: "what each installed addon folder is, weighed against what ESOUI offers",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A folder the deploy owns is marked as such and weighed no further.",
    },
    {
      invariantKind: "departure",
      statement: "A folder ESOUI knows nothing about is marked as unmatched.",
    },
    {
      invariantKind: "departure",
      statement: "A version is compared with the space inside that version collapsed.",
    },
    {
      invariantKind: "departure",
      statement: "An installed addon stating no version counts as out of date.",
    },
    {
      invariantKind: "departure",
      statement: "The first ESOUI entry claiming a folder keeps that folder.",
    },
    {
      invariantKind: "departure",
      statement: "Only an out-of-date folder is picked up unless the caller forces the rest.",
    },
    {
      invariantKind: "departure",
      statement: "A download is fetched once however many folders that download carries.",
    },
  ],
} as const satisfies Module
