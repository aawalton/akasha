import type { Module } from "@akasha/code-system/module"

export const deviceSecretBody = {
  id: "01a05b54-a905-71cf-a52e-7ce099efef28",
  pageTypeSlug: "module",
  slug: "device-secret-body",
  definition: "the bodies the device secret routes take and answer with",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A body naming no device is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A body carrying more than the device it names is refused.",
    },
    {
      invariantKind: "departure",
      statement: "An answer carrying no secret of the minted shape is refused.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here mints or revokes.",
    },
  ],
} as const satisfies Module
