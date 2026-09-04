import type { Module } from "@akasha/code-system/module"

export const messageReachWrite = {
  id: "01a0686c-f06b-700e-9e66-f4c7b386ffe1",
  pageTypeSlug: "module",
  slug: "message-reach-write",
  definition: "the seat a message page being written is reached at, and its waking afterwards",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Only a message being written is addressed; every other page is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "An address that cannot be read refuses the write rather than landing it.",
    },
    {
      invariantKind: "departure",
      statement: "A seat that cannot be reached refuses the write as unreachable.",
    },
    {
      invariantKind: "departure",
      statement: "A seat carrying no name has no directory to be written in.",
    },
    {
      invariantKind: "departure",
      statement: "A seat is woken after the message stands rather than before.",
    },
    {
      invariantKind: "departure",
      statement: "A waking that fails is said aloud and the message still stands.",
    },
  ],
} as const satisfies Module
