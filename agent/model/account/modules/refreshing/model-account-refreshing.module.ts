import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const modelAccountRefreshing = {
  id: "01a0633c-772d-75a9-bf36-5beb8bfeea02",
  type: "page-type/module",
  slug: "model-account-refreshing",
  definition: "how code reads what each model account spends from Anthropic",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every Anthropic account with a page is reached in turn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A credential is read off the page rather than made.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An account whose access token has lapsed is passed over rather than renewed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A token expiring at the moment being read against has lapsed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An account whose subscription is withdrawn is passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An account that was not refreshed is named with why rather than left unsaid.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An account the endpoint refuses leaves the values beside its page unchanged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One account refused does not stop the accounts after that account.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here renews a token.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here starts a rate-limit window.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a value the commit has.",
    },
  ],
} as const satisfies Module
