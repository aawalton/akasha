import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const sha1Digest = {
  id: "01a05d42-bbcb-7988-8b8e-e0a7b0f48b07",
  type: "module",
  slug: "sha1-digest",
  definition: "the sha1 digest of some bytes, worked out in TypeScript and nothing else",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A digest is byte-identical to the digest `node:crypto` answers for the same bytes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A digest is answered rather than promised.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches a crypto library the platform has.",
    },
  ],
} as const satisfies Module
