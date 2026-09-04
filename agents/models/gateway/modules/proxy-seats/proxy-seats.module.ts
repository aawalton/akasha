import type { Module } from "@akasha/code-system/module"

export const proxySeats = {
  id: "01a0643b-c944-7618-aa57-457af63b61dd",
  pageTypeSlug: "module",
  slug: "proxy-seats",
  definition: "the seats running a gateway process that is alive",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The seat active most recently comes first.",
    },
    {
      invariantKind: "departure",
      statement: "Two seats active at the same moment are ordered by agent id.",
    },
    {
      invariantKind: "departure",
      statement: "Ordering leaves the list handed in unchanged.",
    },
    {
      invariantKind: "departure",
      statement: "A seat holding no proxy is no live seat.",
    },
    {
      invariantKind: "departure",
      statement: "A seat whose process answers no signal is no live seat.",
    },
    {
      invariantKind: "departure",
      statement: "A live seat carries the version its proxy is running.",
    },
    {
      invariantKind: "departure",
      statement: "A live seat carries the agent id the seat is reached by.",
    },
    {
      invariantKind: "departure",
      statement: "A seat carrying no name is live under a null name.",
    },
    {
      invariantKind: "departure",
      statement: "The live seats hold the order the agents arrived in.",
    },
    {
      invariantKind: "departure",
      statement: "A process is asked about only where its seat holds a proxy.",
    },
    {
      invariantKind: "constraint",
      statement: "A caller hands in the read answering what a seat holds.",
    },
    {
      invariantKind: "constraint",
      statement: "A caller hands in the test answering whether a process is alive.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the seat roster.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here signals a process.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a port.",
    },
    {
      invariantKind: "gap",
      statement: "Nothing here reaches `akasha/utils-process/pid-signal` for the liveness test.",
    },
  ],
} as const satisfies Module
