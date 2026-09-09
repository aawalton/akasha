import type { Module } from "@akasha/code/module"

export const deviceSecretBody = {
  id: "01a05b54-a905-71cf-a52e-7ce099efef28",
  pageTypeSlug: "module",
  type: "module",
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
      statement: "A body carrying anything beyond the device that body names is refused.",
    },
    {
      invariantKind: "departure",
      statement: "An answer with no secret of the minted shape is refused.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here mints or revokes.",
    },
  ],
} as const satisfies Module
