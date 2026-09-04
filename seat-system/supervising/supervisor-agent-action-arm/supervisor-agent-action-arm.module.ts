import type { Module } from "@akasha/code-system/module"

export const supervisorAgentActionArm = {
  id: "01a0683e-3dbe-7005-8bd3-faecca604871",
  pageTypeSlug: "module",
  slug: "supervisor-agent-action-arm",
  definition: "an idle gate armed to hold a restart until the session is between turns",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A gate whose defer windows could not be read is not armed.",
    },
    {
      invariantKind: "departure",
      statement: "A gate already armed is not armed a second time.",
    },
    {
      invariantKind: "departure",
      statement: "The child's age is read from its process start rather than counted from arming.",
    },
  ],
} as const satisfies Module
