import type { Module } from "@akasha/code-system/module"

export const rateLimitRefusal = {
  id: "01a0643b-c943-7a1f-b0e1-0b4d0a926680",
  pageTypeSlug: "module",
  slug: "rate-limit-refusal",
  definition: "the 429 a client is answered where every account is at its limit",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A refusal is a 429.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names the error type `rate_limit_error`.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal carries the anthropic error envelope.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names the eligible count against the total.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names the seconds a client is told to wait.",
    },
    {
      invariantKind: "departure",
      statement: "A pool with no known reset waits 60 seconds.",
    },
    {
      invariantKind: "departure",
      statement: "A reset at or behind the moment handed in waits 60 seconds.",
    },
    {
      invariantKind: "departure",
      statement: "A reset ahead waits the seconds up to that reset.",
    },
    {
      invariantKind: "departure",
      statement: "A wait of part of a second is rounded up to a whole second.",
    },
    {
      invariantKind: "departure",
      statement: "A wait never falls below one second.",
    },
    {
      invariantKind: "departure",
      statement: "A pool with no known reset says the earliest reset is unknown.",
    },
    {
      invariantKind: "departure",
      statement: "A known reset is said as an iso moment.",
    },
    {
      invariantKind: "departure",
      statement: "A response carries the status text `Too Many Requests`.",
    },
    {
      invariantKind: "departure",
      statement: "A response is sent as json.",
    },
    {
      invariantKind: "departure",
      statement: "A response carries the wait in a `retry-after` header.",
    },
    {
      invariantKind: "departure",
      statement: "The moment a wait is measured from is handed in.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a clock.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads an account.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a line.",
    },
    {
      invariantKind: "gap",
      statement: "The message a client reads is written in English alone.",
    },
    {
      invariantKind: "gap",
      statement: "A reset far ahead is answered a wait no client is expected to honour.",
    },
  ],
} as const satisfies Module
