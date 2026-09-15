import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatProxyState = {
  id: "01a06949-b281-74be-8e33-ceb172d49567",
  type: "page-type/module",
  slug: "seat-proxy-state",
  definition: "the oauth proxy a seat holds, written beside the seat and read back from akasha",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A proxy is read back only where its process key parses.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A proxy whose port is not a number is not read back.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A proxy whose version is empty or absent is not read back.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A process key held as null reads the same as a key that is not there.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Nothing is written where the agent has no seat name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A pid whose start ticks will not read is written as a null process key.",
    },
  ],
} as const satisfies Module
