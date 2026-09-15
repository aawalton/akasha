import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorSelfHealInstall = {
  id: "01a06876-abda-7010-b833-f472fa23d6e8",
  type: "page-type/module",
  slug: "supervisor-self-heal-install",
  definition: "running the install a self-heal needs, one flight at a time",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A path the install script reads reaches the script as an argument rather than as text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One install runs at a time across every supervisor.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A lock file has that install.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A supervisor waiting past the lock ceiling keeps its image rather than installing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An install already done for a version is not run a second time.",
    },
  ],
} as const satisfies Module
