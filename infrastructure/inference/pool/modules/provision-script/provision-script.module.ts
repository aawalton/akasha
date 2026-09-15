import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const provisionScript = {
  id: "01a0685d-4b35-7007-bb8e-7ea5dbcfc851",
  type: "module",
  slug: "provision-script",
  definition: "the shell a host is asked to run to report, provision or tear down a service",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every value the shell has is quoted rather than trusted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The content hash is stamped last.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A failed step leaves the service stale rather than current.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An always-on service is loaded at login and kept alive.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pool service is not loaded at login and is not kept alive.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A launchd bootstrap that fails on input/output or on being in progress is retried.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A launchd bootstrap that fails any other way is raised.",
    },
  ],
} as const satisfies Module
