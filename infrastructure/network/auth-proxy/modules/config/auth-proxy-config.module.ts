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
  createdAt: "2026-09-03T17:49:10.140Z",
  updatedAt: "2026-09-15T18:34:44.000Z",
} as const satisfies Module
