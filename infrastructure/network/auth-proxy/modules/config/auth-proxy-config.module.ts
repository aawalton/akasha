import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const authProxyConfig = {
  id: "01a06863-8e7c-7047-9da8-7b7f8e0ac120",
  type: "page-type/module",
  slug: "auth-proxy-config",
  definition: "the settings the proxy reads out of its environment",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Loading this module reads the environment once and never again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A setting the environment does not name takes a stated default.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A setting the environment spells wrongly stops the proxy from starting.",
    },
  ],
} as const satisfies Module
