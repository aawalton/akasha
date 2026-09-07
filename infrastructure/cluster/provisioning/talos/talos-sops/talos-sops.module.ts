import type { Module } from "@akasha/code/module"

export const talosSops = {
  id: "01a06813-7b0f-715d-8205-05e5a2b14b85",
  pageTypeSlug: "module",
  slug: "talos-sops",
  definition: "a spawned `sops` decrypting to a temporary file and encrypting back to one",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A decrypted file is written only under the temporary directory at mode 0600.",
    },
  ],
} as const satisfies Module
