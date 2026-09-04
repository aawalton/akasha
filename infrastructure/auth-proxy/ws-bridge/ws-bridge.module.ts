import type { Module } from "@akasha/code-system/module"

export const wsBridge = {
  id: "01a06863-8e7c-78f7-8506-2298935c6523",
  pageTypeSlug: "module",
  slug: "ws-bridge",
  definition: "a websocket to the target held open behind the one held to the caller",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "What the caller sends before the target answers is held and sent on after.",
    },
    {
      invariantKind: "departure",
      statement: "Either side closing closes the other.",
    },
  ],
} as const satisfies Module
