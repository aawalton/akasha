import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const backupAttestation = {
  id: "01a06863-74e5-7f8f-a6d4-4ab66523eedc",
  pageTypeSlug: "module",
  slug: "backup-attestation",
  definition: "the hashes a copied backup is attested by, and the probe proving the hasher works",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A hasher reporting nothing for a file of known bytes fails the run.",
    },
    {
      invariantKind: "departure",
      statement: "Every file of a copied unit has a hash line of its own.",
    },
  ],
} as const satisfies Module
