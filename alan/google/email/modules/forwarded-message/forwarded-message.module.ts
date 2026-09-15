import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const forwardedMessage = {
  id: "01a0657c-604c-7002-a940-7c5975e0d53e",
  type: "page-type/module",
  slug: "forwarded-message",
  definition: "the bytes of one email wrapped as a forward of itself",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A forward is made of an attribution part and the original's body part.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A boundary appearing anywhere in the original is minted again.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The original is read as latin1.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A header folded over several lines is read as a single header.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The original's content headers are carried onto the body part.",
    },
  ],
} as const satisfies Module
