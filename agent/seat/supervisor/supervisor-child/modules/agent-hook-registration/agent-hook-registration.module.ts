import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const agentHookRegistration = {
  id: "01a069ca-e863-7000-a1ae-b2d92e543dd0",
  type: "page-type/module",
  slug: "agent-hook-registration",
  definition: "what the agent hook pages register with a client at spawn",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A registration names the link an event is dispatched through rather than a hook.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One registration answers for every hook running at that event.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The registration matches every tool, and which hook runs is settled at the call.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A client reads the settings document once at spawn and never again.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path written here names no checkout, so a moving tree leaves it true.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The links are put in place here, before any registration names one.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An index naming no agent hook is refused rather than answered empty.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An agent hook whose code file is absent is refused by name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An agent hook naming no event registers nothing rather than refusing the spawn.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A hook parked that way is the one hook parked rather than the whole fleet.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "What a hook page carries is read from the index rather than by loading the page.",
    },
  ],
} as const satisfies Module
