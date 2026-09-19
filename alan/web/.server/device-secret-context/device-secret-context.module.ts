import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const deviceSecretContext = {
  id: "01a0655e-d39a-7632-bb48-cb68d5895b87",
  type: "page-type/module",
  slug: "device-secret-context",
  definition: "whoever a presented device secret represents, and the refusals short of one",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A secret refused and a store that did not answer are two outcomes rather than one outcome.",
    },
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
      statement: "The route answers each of the three outcomes with a status of its own.",
    },
  ],
  test: "ts",
} as const satisfies Module
