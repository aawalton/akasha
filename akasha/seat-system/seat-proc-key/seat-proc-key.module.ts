import type { Module } from "@akasha/code-system/module"

export const seatProcKey = {
  id: "01a068a4-60f0-7000-bffe-694978e0a342",
  pageTypeSlug: "module",
  slug: "seat-proc-key",
  definition:
    "a pid held together with the tick its process started at, so a reused pid reads as gone",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A process is present only where the pid stands and its start tick is the one held.",
    },
    {
      invariantKind: "departure",
      statement: "A pid the kernel no longer names is absent.",
    },
    {
      invariantKind: "departure",
      statement: "A pid whose stat file will not read is unknown rather than absent.",
    },
    {
      invariantKind: "departure",
      statement:
        "A key is written as the pid, a hyphen and the start ticks, and is read back across a hyphen or a dot.",
    },
    {
      invariantKind: "departure",
      statement: "A key stated as anything but two whole numbers is no key.",
    },
  ],
} as const satisfies Module
