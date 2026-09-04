import type { Module } from "@akasha/code-system/module"

export const supervisorClearRebindWire = {
  id: "01a0683e-3dbe-7013-ac46-7d54c415b88f",
  pageTypeSlug: "module",
  slug: "supervisor-clear-rebind-wire",
  definition: "a rotated session watched for, and the supervisor rebound onto it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rotation is claimed once, so two watchers cannot rebind onto the same session.",
    },
    {
      invariantKind: "departure",
      statement:
        "A deferred restart standing when a rotation lands is cancelled before the rebind.",
    },
  ],
} as const satisfies Module
