import type { Module } from "@akasha/code/module"

export const sops = {
  id: "01a06813-7b0f-715d-8205-05e5a2b14b85",
  pageTypeSlug: "module",
  type: "module",
  slug: "sops",
  definition: "a spawned `sops` decrypting to a temporary file and encrypting back to one",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A decrypted file is written only under `/var/tmp` at mode 0600.",
    },
  ],
} as const satisfies Module
