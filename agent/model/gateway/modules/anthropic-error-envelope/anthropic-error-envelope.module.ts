import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const anthropicErrorEnvelope = {
  id: "01a06299-3f11-7a04-9c62-5d0b8e41f7a2",
  type: "page-type/module",
  slug: "anthropic-error-envelope",
  definition: "the error shape upstream wraps around a failure",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An envelope names the error type upstream gave the failure.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An envelope has a message as an optional field.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body with keys the envelope does not name still parses.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body the JSON parser refuses parses to nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body with no envelope parses to nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A payload naming a type other than `error` parses to nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A `__proto__` key in the parsed body reaches no prototype.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An envelope is built here from the error type and the message handed in.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here decides the meaning of a failure.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the status a failure arrived with.",
    },
  ],
} as const satisfies Module
