import type { Module } from "@akasha/code-system/module"

export const kubectlPermissions = {
  id: "01a06860-955d-7021-a57f-ad04e24c9076",
  pageTypeSlug: "module",
  slug: "kubectl-permissions",
  definition: "the rbac a kubectl command line would need, read off the command line itself",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A resource token this module does not model is reported as unmodelled rather than skipped.",
    },
    {
      invariantKind: "departure",
      statement:
        "A namespace or name the shell would expand is read as unknown rather than as its literal.",
    },
  ],
} as const satisfies Module
