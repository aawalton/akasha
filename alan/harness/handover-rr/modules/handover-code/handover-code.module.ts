import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const handoverCode = {
  id: "01a0bb44-4dec-7f6d-b99e-f83158413eb6",
  type: "page-type/module",
  slug: "handover-code",
  definition: "the short-lived signed code alanwalton.com mints and a peripheral reads",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A code is signed with EdDSA over an Ed25519 key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A code names one audience, and an audience of two is no audience.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A code whose life runs past sixty seconds is refused however well it is signed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No clock tolerance is allowed, so an expired code is expired.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A code that will not read is nobody rather than an error.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A code carries the hash of a secret its holder keeps, and never that secret.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A code carrying that hash reads only where the secret shown hashes to it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A code carrying no such hash reads only where no secret is shown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One reader answers every code, and the hash is weighed where the signature is.",
    },
  ],
} as const satisfies Module
