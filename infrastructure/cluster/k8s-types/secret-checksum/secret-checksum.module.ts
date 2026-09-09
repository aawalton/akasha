import type { Module } from "@akasha/code/module"

export const secretChecksum = {
  id: "01a06735-dd9c-700b-a47e-9fe485b96dbb",
  pageTypeSlug: "module",
  type: "module",
  slug: "secret-checksum",
  definition: "the hash a secret's contents are summed to",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A dot in a key names the key rather than a field under a field.",
    },
  ],
} as const satisfies Module
