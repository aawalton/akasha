import type { Module } from "@akasha/code/module"

export const anthropicErrorEnvelope = {
  id: "01a06299-3f11-7a04-9c62-5d0b8e41f7a2",
  pageTypeSlug: "module",
  type: "module",
  slug: "anthropic-error-envelope",
  definition: "the error shape upstream wraps a failure in",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An envelope names the error type upstream gave the failure.",
    },
    {
      invariantKind: "departure",
      statement: "An envelope has a message as an optional field.",
    },
    {
      invariantKind: "departure",
      statement: "A body with keys the envelope does not name still parses.",
    },
    {
      invariantKind: "departure",
      statement: "A body the JSON parser refuses parses to nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A body with no envelope parses to nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A payload naming a type other than `error` parses to nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A `__proto__` key in the parsed body reaches no prototype.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides the meaning of a failure.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the status a failure arrived with.",
    },
  ],
} as const satisfies Module
