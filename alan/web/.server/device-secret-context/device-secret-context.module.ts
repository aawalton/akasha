import type { Module } from "@akasha/code/module"

export const deviceSecretContext = {
  id: "01a0655e-d39a-7632-bb48-cb68d5895b87",
  pageTypeSlug: "module",
  slug: "device-secret-context",
  definition: "the account a presented device secret represents, and the refusals short of one",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A secret refused and a store that did not answer are two outcomes rather than one.",
    },
    {
      invariantKind: "departure",
      statement: "The route answers each of the three outcomes with a status of its own.",
    },
  ],
} as const satisfies Module
