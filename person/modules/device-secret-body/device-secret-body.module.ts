import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const deviceSecretBody = {
  id: "01a05b54-a905-71cf-a52e-7ce099efef28",
  type: "page-type/module",
  slug: "device-secret-body",
  definition: "the bodies the device secret routes take and answer",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A body naming no device is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body carrying anything beyond the device that body names is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An answer with no secret of the minted shape is refused.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here mints or revokes.",
    },
  ],
} as const satisfies Module
