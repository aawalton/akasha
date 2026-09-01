import type { Module } from "@akasha/code-system/module"

export const deviceSecretShape = {
  id: "01a05d42-bbca-790f-b10c-1d1b1caed1c9",
  pageTypeSlug: "module",
  slug: "device-secret-shape",
  definition: "how a device secret is written, and how anything else is told from it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A device secret opens with `dvs_v1_`.",
    },
    {
      invariantKind: "departure",
      statement: "A device secret closes with 43 base64url characters.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here hashes a secret.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the store.",
    },
  ],
} as const satisfies Module
