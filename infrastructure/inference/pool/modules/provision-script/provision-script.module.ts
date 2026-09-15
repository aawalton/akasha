import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const provisionScript = {
  id: "01a0685d-4b35-7007-bb8e-7ea5dbcfc851",
  type: "module",
  slug: "provision-script",
  definition: "the shell a host is asked to run to report, provision or tear down a service",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every value the shell has is quoted rather than trusted.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The content hash is stamped last.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A failed step leaves the service stale rather than current.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An always-on service is loaded at login and kept alive.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A pool service is not loaded at login and is not kept alive.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A launchd bootstrap that fails on input/output or on being in progress is retried.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A launchd bootstrap that fails any other way is raised.",
    },
  ],
} as const satisfies Module
