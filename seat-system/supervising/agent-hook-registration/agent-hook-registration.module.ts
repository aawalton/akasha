import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const agentHookRegistration = {
  id: "01a069ca-e863-7000-a1ae-b2d92e543dd0",
  pageTypeSlug: "module",
  type: "module",
  slug: "agent-hook-registration",
  definition: "what the agent hook pages register with a client at spawn",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A registration names the link an event is dispatched through rather than a hook.",
    },
    {
      invariantKind: "departure",
      statement: "One registration answers for every hook running at that event.",
    },
    {
      invariantKind: "departure",
      statement: "The registration matches every tool, and which hook runs is settled at the call.",
    },
    {
      invariantKind: "departure",
      statement: "A client reads the settings document once at spawn and never again.",
    },
    {
      invariantKind: "departure",
      statement: "A path written here names no checkout, so a moving tree leaves it true.",
    },
    {
      invariantKind: "departure",
      statement: "The links are put in place here, before any registration names one.",
    },
    {
      invariantKind: "departure",
      statement: "An index naming no agent hook is refused rather than answered empty.",
    },
    {
      invariantKind: "departure",
      statement: "An agent hook whose code file is absent is refused by name.",
    },
    {
      invariantKind: "departure",
      statement: "What a hook page carries is read from the index rather than by loading the page.",
    },
  ],
} as const satisfies Module
