import type { Module } from "@akasha/code/module"

export const supervisorHandoffEnv = {
  id: "01a0683e-3dbe-7023-a794-3a24720e3484",
  pageTypeSlug: "module",
  slug: "supervisor-handoff-env",
  definition: "what a re-executing supervisor passes to itself through the environment",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A handoff missing a single part is ignored rather than half-read.",
    },
    {
      invariantKind: "departure",
      statement: "A malformed handoff is said before that handoff is ignored.",
    },
    {
      invariantKind: "departure",
      statement: "A proxy owner absent from the handoff is the session's own agent.",
    },
  ],
} as const satisfies Module
