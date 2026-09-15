import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const rateLimitRefusal = {
  id: "01a0643b-c943-7a1f-b0e1-0b4d0a926680",
  type: "module",
  slug: "rate-limit-refusal",
  definition: "the 429 a client is answered where every account is at its limit",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refusal is a 429.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refusal names the error type `rate_limit_error`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refusal has the anthropic error envelope.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refusal names the eligible count against the total.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refusal names the seconds a client is told to wait.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A pool with no known reset waits 60 seconds.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reset at or behind the moment handed in waits 60 seconds.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reset ahead waits the seconds up to that reset.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A wait of part of a second is rounded up to a whole second.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A wait never falls below one second.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A pool with no known reset says the earliest reset is unknown.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A known reset is said as an iso moment.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A response has the status text `Too Many Requests`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A response is sent as json.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A response has the wait in a `retry-after` header.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The moment a wait is measured from is handed in.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a clock.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads an account.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes a line.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "The message a client reads is written in English alone.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A reset far ahead is answered a wait no client is expected to honour.",
    },
  ],
} as const satisfies Module
