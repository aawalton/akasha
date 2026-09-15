import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const backupAttestation = {
  id: "01a06863-74e5-7f8f-a6d4-4ab66523eedc",
  type: "page-type/module",
  slug: "backup-attestation",
  definition: "the hashes a copied backup is attested by, and the probe proving the hasher works",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A hasher reporting nothing for a file of known bytes fails the run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every file of a copied unit has a hash line of its own.",
    },
  ],
} as const satisfies Module
