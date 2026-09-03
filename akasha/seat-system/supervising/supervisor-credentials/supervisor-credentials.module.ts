import type { Module } from "@akasha/code-system/module"

export const supervisorCredentials = {
  id: "01a0683e-3dbe-7016-a806-44c493fde84f",
  pageTypeSlug: "module",
  slug: "supervisor-credentials",
  definition: "the credential pulled for a seat's account while the seat runs",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An account already terminal is not pulled for again.",
    },
    {
      invariantKind: "departure",
      statement: "A terminal failure is reported once rather than on every tick.",
    },
    {
      invariantKind: "departure",
      statement: "A pull that faults is said and the tick ends rather than the timer dying.",
    },
  ],
} as const satisfies Module
