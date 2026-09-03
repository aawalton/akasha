import type { Module } from "@akasha/code-system/module"

export const supervisorDeferredRestartProbe = {
  id: "01a0683e-3dbe-701d-8d02-1a1db2476e25",
  pageTypeSlug: "module",
  slug: "supervisor-deferred-restart-probe",
  definition: "an idle reading bounded by the tick it is taken in",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A probe past its tick reads busy rather than holding the tick open.",
    },
    {
      invariantKind: "departure",
      statement: "A probe that faults reads busy rather than idle.",
    },
  ],
} as const satisfies Module
