import type { Module } from "@akasha/code-system/module"

export const agentHookRegistration = {
  id: "01a069ca-e863-7000-a1ae-b2d92e543dd0",
  pageTypeSlug: "module",
  slug: "agent-hook-registration",
  definition: "what the agent hook pages register with a client at spawn",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A registration names the hook's code file rather than resolving a name at the call.",
    },
    {
      invariantKind: "departure",
      statement: "A client reads the settings document once at spawn and never again.",
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
      invariantKind: "gap",
      statement: "A path written here is frozen against a tree that keeps moving.",
    },
  ],
} as const satisfies Module
