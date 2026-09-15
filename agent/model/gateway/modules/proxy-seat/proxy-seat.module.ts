import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const proxySeat = {
  id: "01a0643b-c944-7618-aa57-457af63b61dd",
  type: "page-type/module",
  slug: "proxy-seat",
  definition: "the seats running a gateway process that is alive",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The seat active most recently comes first.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Two seats active at the same moment are ordered by agent id.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Ordering leaves the list handed in unchanged.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat with no proxy is no live seat.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat whose process answers no signal is no live seat.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A live seat has the version its proxy is running.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A live seat has the agent id the seat is reached by.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat with no name is live under a null name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The live seats have the order the agents arrived in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A process is asked about only where its seat has a proxy.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A caller hands in the read answering the values a seat has.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A caller hands in the test answering whether a process is alive.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads the seat roster.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here signals a process.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a port.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "Nothing here reaches `utils-process/pid-signal` for the liveness test.",
    },
  ],
} as const satisfies Module
