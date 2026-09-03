import type { Module } from "@akasha/code-system/module"

export const supervisorArgs = {
  id: "01a0683e-3dbe-700a-81ce-5968abd14734",
  pageTypeSlug: "module",
  slug: "supervisor-args",
  definition: "the command line a supervisor is started with and restarts itself with",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Parsing stops at the first argument that is not a flag.",
    },
    {
      invariantKind: "departure",
      statement:
        "A re-exec line carries the agent and session it resumes rather than the old ones.",
    },
    {
      invariantKind: "departure",
      statement: "A resume with a prompt is driven by the prompt rather than by what is inbound.",
    },
  ],
} as const satisfies Module
