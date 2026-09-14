import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const supervisorArgs = {
  id: "01a0683e-3dbe-700a-81ce-5968abd14734",
  type: "module",
  slug: "supervisor-args",
  definition: "the command line a supervisor is started with and restarts itself with",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Parsing stops at the first argument that is not a flag.",
    },
    {
      invariantKind: "departure",
      statement:
        "A re-exec line has the agent and session that line resumes rather than the old ones.",
    },
    {
      invariantKind: "departure",
      statement:
        "A resume with a prompt is driven by the prompt rather than by the inbound messages.",
    },
    {
      invariantKind: "departure",
      statement: "A re-exec line has the mode flag the earlier line had.",
    },
    {
      invariantKind: "departure",
      statement:
        "The headless flag is taken from where the modes are spelled rather than spelled here.",
    },
  ],
} as const satisfies Module
