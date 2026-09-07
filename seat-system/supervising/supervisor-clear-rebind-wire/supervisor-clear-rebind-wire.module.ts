import type { Module } from "@akasha/code/module"

export const supervisorClearRebindWire = {
  id: "01a0683e-3dbe-7013-ac46-7d54c415b88f",
  pageTypeSlug: "module",
  slug: "supervisor-clear-rebind-wire",
  definition: "a rotated session watched for, and the supervisor rebound onto it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rotation is claimed once.",
    },
    {
      invariantKind: "departure",
      statement: "Two watchers cannot rebind onto one session.",
    },
    {
      invariantKind: "departure",
      statement:
        "A deferred restart still there when a rotation lands is cancelled before the rebind.",
    },
  ],
} as const satisfies Module
