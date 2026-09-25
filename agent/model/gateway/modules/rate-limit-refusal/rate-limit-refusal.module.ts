import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const rateLimitRefusal = {
  id: "01a0643b-c943-7a1f-b0e1-0b4d0a926680",
  type: "page-type/module",
  slug: "rate-limit-refusal",
  definition: "the error a model gateway sends when no model account can handle a message",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal is a 429.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal names the error type `rate_limit_error`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal has the anthropic error envelope.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal names the eligible count against the total.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal names the seconds a client is told to wait.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pool with no known reset waits 60 seconds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reset at or behind the moment handed in waits 60 seconds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reset ahead waits the seconds up to that reset.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A wait of part of a second is rounded up to a whole second.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A wait never falls below one second.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pool with no known reset says the earliest reset is unknown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A known reset is said as an iso moment.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A response has the status text `Too Many Requests`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A response is sent as json.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A response has the wait in a `retry-after` header.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The moment a wait is measured from is handed in.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a clock.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads an account.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The message a client reads is written in English alone.",
    },
  ],
} as const satisfies Module
