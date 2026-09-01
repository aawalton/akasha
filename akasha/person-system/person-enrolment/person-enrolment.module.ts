import type { Module } from "@akasha/code-system/module"

export const personEnrolment = {
  id: "01a05afe-7a0e-7ae1-ad39-ba070a334a6b",
  pageTypeSlug: "module",
  slug: "person-enrolment",
  definition: "the person an account signing in stands for",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An account reaches a person through the account that person states.",
    },
    {
      invariantKind: "departure",
      statement: "The person pages are asked of the pages system service rather than opened.",
    },
    {
      invariantKind: "departure",
      statement: "An account no person states is nobody.",
    },
    {
      invariantKind: "departure",
      statement: "An account stating nothing is nobody.",
    },
    {
      invariantKind: "departure",
      statement: "An account two people state is read to neither person.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal says whether the pages went unread or named nobody.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here stands a person who has no page.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides what a person may reach.",
    },
  ],
} as const satisfies Module
