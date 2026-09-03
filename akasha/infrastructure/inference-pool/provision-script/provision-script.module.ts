import type { Module } from "@akasha/code-system/module"

export const provisionScript = {
  id: "01a0685d-4b35-7007-bb8e-7ea5dbcfc851",
  pageTypeSlug: "module",
  slug: "provision-script",
  definition: "the shell a host is asked to run to report, provision or tear down a service",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every value the shell carries is quoted here rather than trusted.",
    },
    {
      invariantKind: "departure",
      statement:
        "The content hash is stamped last, so a failed step leaves the service stale rather than current.",
    },
    {
      invariantKind: "departure",
      statement:
        "An always-on service is loaded at login and kept alive; a pool service is neither.",
    },
    {
      invariantKind: "departure",
      statement:
        "A launchd bootstrap that fails on input/output or on being in progress is retried, and any other failure is raised.",
    },
  ],
} as const satisfies Module
