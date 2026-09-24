import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorChildExitDecide = {
  id: "01a0683e-3dbe-700e-bc70-8aac8a65c77d",
  type: "page-type/module",
  slug: "supervisor-child-exit-decide",
  definition: "what a child's wait status says about how the child stopped",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An exit during a shutdown or a supervisor kill is deliberate rather than a crash.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An exit status that could not be observed is a crash rather than a clean stop.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A signal number is named from this host's own signal table.",
    },
  ],
} as const satisfies Module
