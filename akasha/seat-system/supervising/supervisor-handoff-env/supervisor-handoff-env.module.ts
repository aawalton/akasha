import type { Module } from "@akasha/code-system/module"

export const supervisorHandoffEnv = {
  id: "01a0683e-3dbe-7023-a794-3a24720e3484",
  pageTypeSlug: "module",
  slug: "supervisor-handoff-env",
  definition: "what a re-executing supervisor passes to itself through the environment",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A handoff missing any of its parts is ignored rather than half-read.",
    },
    {
      invariantKind: "departure",
      statement: "A malformed handoff is said before it is ignored.",
    },
    {
      invariantKind: "departure",
      statement: "A proxy owner absent from the handoff is the session's own agent.",
    },
  ],
} as const satisfies Module
