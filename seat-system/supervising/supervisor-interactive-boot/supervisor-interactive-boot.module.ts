import type { Module } from "@akasha/code-system/module"

export const supervisorInteractiveBoot = {
  id: "01a06871-3115-7005-8779-160298d3aa4e",
  pageTypeSlug: "module",
  slug: "supervisor-interactive-boot",
  definition: "the once-per-run setup of a seat's account, agent id, proxy and monitors",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The handoff environment is read once and then deleted from the process environment.",
    },
    {
      invariantKind: "departure",
      statement: "An inherited Claude settles the process id, account, agent id and session id.",
    },
    {
      invariantKind: "departure",
      statement: "An agent id is created only where neither the handoff nor the options carry one.",
    },
    {
      invariantKind: "departure",
      statement: "A session id absent from both the handoff and the options is a fresh uuid.",
    },
    {
      invariantKind: "departure",
      statement: "Headless states the launch as spawned and interactive states it as opened.",
    },
    {
      invariantKind: "departure",
      statement: "The console is redirected to the agent before any credential work begins.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here spawns a Claude child; it readies what a child will need.",
    },
  ],
} as const satisfies Module
