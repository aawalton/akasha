import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const personEnrolment = {
  id: "01a05afe-7a0e-7ae1-ad39-ba070a334a6b",
  type: "page-type/module",
  slug: "person-enrolment",
  definition: "the person a caller signing in represents",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An account reaches a person through the account that person states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A contributor reaches a person through the contributor that person names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Whoever a caller is, is one contributor or one account.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A contributor named without a page type is the contributor of that slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A contributor named under another page type is nobody.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A contributor no person names is nobody.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A contributor two people name is read to neither person.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The person pages are asked of the pages system service rather than opened.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An account no person states is nobody.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An account stating nothing is nobody.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An account two people state is read to neither person.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal says whether the pages went unread or named nobody.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here sets up a person who has no page.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here decides a person's access.",
    },
  ],
} as const satisfies Module
