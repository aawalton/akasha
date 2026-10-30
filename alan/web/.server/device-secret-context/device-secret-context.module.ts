import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const deviceSecretContext = {
  id: "01a0655e-d39a-7632-bb48-cb68d5895b87",
  type: "page-type/module",
  slug: "device-secret-context",
  definition: "the person a device secret on a request belongs to",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A secret refused and a store that did not answer are two outcomes rather than one outcome.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The route answers each of the three outcomes with a status of its own.",
    },
  ],
  test: "ts",
  createdAt: "2026-09-03T03:45:08.506Z",
  updatedAt: "2026-10-30T17:18:16.084Z",
} as const satisfies Module
