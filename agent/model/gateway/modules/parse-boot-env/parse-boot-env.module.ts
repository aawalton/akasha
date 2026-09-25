import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const parseBootEnv = {
  id: "01a0628d-3afc-71c0-a3c3-1c6db3b4a45f",
  type: "page-type/module",
  slug: "parse-boot-env",
  definition: "the boot settings a gateway parses out of environment variables",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Boot refuses where a required key is absent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal names the keys that failed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Boot refuses by throwing rather than by returning a result.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An absent OAUTH_PROXY_VERSION is taken as the word unknown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An absent OAUTH_PROXY_PORT is taken as port zero.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A port above 65535 refuses boot.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An unreadable OAUTH_PROXY_PORT refuses boot.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A blank timeout key is taken as that key's default.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An unreadable timeout key is taken as that key's default.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The upstream idle timeout default is ten minutes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The downstream keepalive default comes from the keepalive module.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The parsed settings carry no environment key beyond the seven declared keys.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A blank OAUTH_PROXY_VERSION is taken as the word unknown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A blank required key refuses boot as an absent one does.",
    },
  ],
} as const satisfies Module
