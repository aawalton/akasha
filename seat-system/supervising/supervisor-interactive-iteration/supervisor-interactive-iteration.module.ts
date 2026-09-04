import type { Module } from "@akasha/code-system/module"

export const supervisorInteractiveIteration = {
  id: "01a06871-3115-7006-b87f-63a3b2e561a3",
  pageTypeSlug: "module",
  slug: "supervisor-interactive-iteration",
  definition: "one pass of a seat's loop: its agent, its child, and the process record it leaves",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An agent id is created only where the pass was handed none.",
    },
    {
      invariantKind: "departure",
      statement:
        "A carried name and a pending prompt reach a fresh agent alone, and are then cleared.",
    },
    {
      invariantKind: "departure",
      statement: "A reset prompt that fails to deliver is logged and the pass goes on.",
    },
    {
      invariantKind: "departure",
      statement: "A session id that fails to write is logged and the pass goes on.",
    },
    {
      invariantKind: "departure",
      statement: "Claimed redelivery is reconciled only on a resume that adopted no child.",
    },
    {
      invariantKind: "departure",
      statement: "Redelivery is reconciled without being awaited.",
    },
    {
      invariantKind: "departure",
      statement: "The transcript is kept at the session's file under the project directory.",
    },
  ],
} as const satisfies Module
