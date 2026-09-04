import type { Module } from "@akasha/code-system/module"

export const ptyTerminalDeath = {
  id: "01a069c2-9357-7002-8c4b-9929c9d4cb5a",
  pageTypeSlug: "module",
  slug: "pty-terminal-death",
  definition:
    "the teardown a proxy runs once its terminal dies, signalling the child before killing it",
  code: "ts",
} as const satisfies Module
