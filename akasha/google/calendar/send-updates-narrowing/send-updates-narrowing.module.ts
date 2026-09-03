import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const sendUpdatesNarrowing = {
  id: "01a0657c-604c-7000-884b-de941ede99ce",
  pageTypeSlug: "module",
  slug: "send-updates-narrowing",
  definition: "the three values a send-updates choice takes, and a raw value read as one",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A send-updates value outside the three is refused rather than defaulted.",
    },
    {
      invariantKind: "departure",
      statement: "Saying nothing about send-updates is not saying none.",
    },
  ],
} as const satisfies Module
