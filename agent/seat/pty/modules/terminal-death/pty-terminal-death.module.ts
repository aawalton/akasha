import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const ptyTerminalDeath = {
  id: "01a069c2-9357-7002-8c4b-9929c9d4cb5a",
  type: "page-type/module",
  slug: "pty-terminal-death",
  definition:
    "the teardown a proxy runs once its terminal dies, signalling the child before killing it",
  code: "ts",
  createdAt: "2026-09-04T00:12:34.519Z",
  updatedAt: "2026-09-15T16:42:06.000Z",
} as const satisfies Module
