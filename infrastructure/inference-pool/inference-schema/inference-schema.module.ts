import type { Module } from "@akasha/code-system/module"

export const inferenceSchema = {
  id: "01a0685d-4b35-7000-a89c-fa9904f3e21d",
  pageTypeSlug: "module",
  slug: "inference-schema",
  definition: "what a declared inference host, service and managed environment hold",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A pool service declares an internal port and an always-on service does not.",
    },
    { invariantKind: "departure", statement: "A warm service is a pool service." },
    { invariantKind: "departure", statement: "A service's name is lower kebab case." },
  ],
} as const satisfies Module
