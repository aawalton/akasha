import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const providerUpstream = {
  id: "01a0a545-fe20-78a2-8aab-bd467841ffcd",
  type: "page-type/module",
  slug: "provider-upstream",
  definition:
    "how code finds what a model gateway uses when the model gateway calls a model outside Anthropic",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One lookup answers the upstream of any provider it is named.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The provider a gateway falls back to is DeepSeek, looked up that way.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The account a provider is sent under is the one held with that provider.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The base is read off the provider's page and the key off the account's sops file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A provider the root files no account for is answered as none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A provider whose account holds no key is answered as none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An upstream answered names its provider by the provider's slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The model a provider is asked for is read off the provider's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A body is rewritten to ask for that model rather than the model the caller named.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A provider stating no model of its own is asked for what the caller named.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body nothing here can rewrite is sent as that body came.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A provider's upstream read once is held for the life of the reader.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One reader holds the upstream of each provider apart from every other.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A provider answered as none is read again on the next call.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The repository root reaches every reader here as a parameter.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The reader of an account's secrets reaches this module as a parameter.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here throws.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here fetches.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No key value reaches a log here.",
    },
  ],
  createdAt: "2026-09-15T13:33:42.816Z",
  updatedAt: "2026-10-12T12:30:00.745Z",
} as const satisfies Module
