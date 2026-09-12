import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const sops = {
  id: "01a06813-7b0f-715d-8205-05e5a2b14b85",
  type: "module",
  slug: "sops",
  definition: "a spawned `sops` decrypting to a temporary file and encrypting back to one",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A decrypted file is written only under `/var/tmp` at mode 0600.",
    },
    {
      invariantKind: "constraint",
      statement: "An encrypt that wrote the bundle names that write before the mode is set.",
    },
    {
      invariantKind: "departure",
      statement:
        "What sops is spawned for and what is written are handed in, so a test drives neither.",
    },
  ],
} as const satisfies Module
