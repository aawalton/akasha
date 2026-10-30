import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const deviceSecretChanging = {
  id: "01a18dd1-c015-7ebc-a4a3-619d2d86ceb7",
  type: "page-type/module",
  slug: "device-secret-changing",
  definition: "how code changes the secret a device holds",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A minting reads the session on the request before it reads any account.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call handing over no request is read by its account alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call naming no contributor and no account mints nothing and revokes nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A recovery that goes uncounted still hands the device its minted secret.",
    },
  ],
  test: "ts",
  createdAt: "2026-10-30T17:18:16.084Z",
  updatedAt: "2026-10-30T17:18:16.084Z",
} as const satisfies Module
