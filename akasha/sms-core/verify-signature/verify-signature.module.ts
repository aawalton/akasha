import type { Module } from "../../code-system/module/module.page-type.ts"

export const verifySignature = {
  id: "01a05b6f-999d-7522-a55b-564a85f90c43",
  pageTypeSlug: "module",
  slug: "verify-signature",
  definition: "whether an inbound webhook truly came from Telnyx",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "What was signed is the timestamp and the raw body joined by a bar.",
    },
    {
      invariantKind: "departure",
      statement: "A signature older than the tolerance is refused however well it verifies.",
    },
    {
      invariantKind: "departure",
      statement: "The tolerance is five minutes where none is given.",
    },
    {
      invariantKind: "departure",
      statement: "A clock ahead of the signer is tolerated as far as a clock behind it.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here throws.",
    },
    {
      invariantKind: "departure",
      statement: "The base64 spelling of bytes stands here for whoever needs it.",
    },
  ],
} as const satisfies Module
