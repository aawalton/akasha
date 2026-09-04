import type { Module } from "@akasha/code-system/module"

export const seatResume = {
  id: "01a069cb-0380-75c8-b903-b90fa293edf7",
  pageTypeSlug: "module",
  slug: "seat-resume",
  definition: "a seat put back on the session it was bound to, live or stopped",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The ops dispatcher imports this and calls the default export it declares.",
    },
    {
      invariantKind: "departure",
      statement:
        "A gated restart clears when the restart is armed rather than when a supervisor is up.",
    },
    {
      invariantKind: "departure",
      statement: "The pane is held open before the takeover.",
    },
    {
      invariantKind: "departure",
      statement: "A takeover ends the supervisor process the pane runs.",
    },
    {
      invariantKind: "departure",
      statement:
        "A seat holding a session is respawned in place so its attached terminals are kept.",
    },
    {
      invariantKind: "departure",
      statement: "A seat holding no session is killed and launched again.",
    },
    {
      invariantKind: "departure",
      statement: "A launch flag handed to a live seat is refused rather than quietly ignored.",
    },
  ],
} as const satisfies Module
