import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const sops = {
  id: "01a06813-7b0f-715d-8205-05e5a2b14b85",
  type: "page-type/module",
  slug: "sops",
  definition: "a spawned `sops` decrypting to a temporary file and encrypting back to one",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A decrypted file is written only under `/var/tmp` at mode 0600.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "An encrypt that wrote the bundle names that write before the mode is set.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "What sops is spawned for and what is written are handed in, so a test drives neither.",
    },
  ],
  createdAt: "2026-09-03T16:21:42.287Z",
  updatedAt: "2026-09-15T18:34:44.000Z",
} as const satisfies Module
