import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const personEnrolment = {
  id: "01a05afe-7a0e-7ae1-ad39-ba070a334a6b",
  type: "module",
  slug: "person-enrolment",
  definition: "the person an account signing in represents",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An account reaches a person through the account that person states.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The person pages are asked of the pages system service rather than opened.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An account no person states is nobody.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An account stating nothing is nobody.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An account two people state is read to neither person.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refusal says whether the pages went unread or named nobody.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here sets up a person who has no page.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here decides a person's access.",
    },
  ],
} as const satisfies Module
