import type { Module } from "@akasha/code/module"

export const wsBridge = {
  id: "01a06863-8e7c-78f7-8506-2298935c6523",
  pageTypeSlug: "module",
  type: "module",
  slug: "ws-bridge",
  definition: "a websocket to the target held open behind the one held to the caller",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The messages the caller sends before the target answers are held and sent on after.",
    },
    {
      invariantKind: "departure",
      statement: "Either side closing closes the far side.",
    },
  ],
} as const satisfies Module
