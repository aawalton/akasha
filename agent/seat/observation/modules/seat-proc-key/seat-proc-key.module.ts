import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatProcKey = {
  id: "01a068a4-60f0-7000-bffe-694978e0a342",
  type: "module",
  slug: "seat-proc-key",
  definition:
    "a pid held together with the tick its process started at, so a reused pid reads as gone",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A process is present only where the pid is there and its start tick is the tick held.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A pid the kernel no longer names is absent.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A pid whose stat file will not read is unknown rather than absent.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page naming no process at all is absent rather than unknown.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Only a process named and unreadable leaves whether an agent is there unknown.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key is written as the pid and a hyphen and the start ticks.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key is read back across a hyphen or a dot.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key stated as anything but two whole numbers is no key.",
    },
  ],
} as const satisfies Module
