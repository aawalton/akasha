import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorArgs = {
  id: "01a0683e-3dbe-700a-81ce-5968abd14734",
  type: "page-type/module",
  slug: "supervisor-args",
  definition: "the command line starting a supervisor and restarting it",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Parsing stops at the first argument that is not a flag.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A re-exec line has the agent and session that line resumes rather than the old ones.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A resume with a prompt is driven by the prompt rather than by the inbound messages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A re-exec line has the mode flag the earlier line had.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The headless flag is taken from where the modes are spelled rather than spelled here.",
    },
  ],
} as const satisfies Module
