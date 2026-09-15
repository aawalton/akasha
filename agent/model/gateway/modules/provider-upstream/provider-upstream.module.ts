import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const providerUpstream = {
  id: "01a0a545-fe20-78a2-8aab-bd467841ffcd",
  type: "module",
  slug: "provider-upstream",
  definition: "the base and key a gateway sends a provider a request with",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The provider a gateway falls back to is DeepSeek.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The account the fallback is sent under is the one held with that provider.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The base is read off the provider's page and the key off the account's sops file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A fallback the root files no account for is answered as none.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A fallback whose account holds no key is answered as none.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A fallback read once is held for the life of the reader.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A fallback answered as none is read again on the next call.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "The repository root reaches every reader here as a parameter.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "The reader of an account's secrets reaches this module as a parameter.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here throws.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here fetches.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No key value reaches a log here.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A key rotated after the first read is not picked up until the gateway restarts.",
    },
  ],
} as const satisfies Module
