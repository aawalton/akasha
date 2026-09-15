import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorInteractiveBoot = {
  id: "01a06871-3115-7005-8779-160298d3aa4e",
  type: "page-type/module",
  slug: "supervisor-interactive-boot",
  definition: "the once-per-run setup of a seat's account, agent id, proxy and monitors",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The handoff environment is read once and then deleted from the process environment.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An inherited Claude settles the process id and account and agent id and session id.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An agent id is created only where neither the handoff nor the options have an agent id.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A session id absent from both the handoff and the options is a fresh uuid.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Headless states the launch as spawned and interactive states that launch as opened.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The console is redirected to the agent before any credential work begins.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here spawns a Claude child.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "This module readies the setup a child will need.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stating that never returns holds boot open rather than being cut at a ceiling.",
    },
  ],
} as const satisfies Module
