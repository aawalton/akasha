import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const parseBootEnv = {
  id: "01a0628d-3afc-71c0-a3c3-1c6db3b4a45f",
  type: "page-type/module",
  slug: "parse-boot-env",
  definition: "the boot settings a gateway parses out of environment variables",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Boot refuses where a required key is absent.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refusal names the keys that failed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Boot refuses by throwing rather than by returning a result.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An absent OAUTH_PROXY_VERSION reads as the word unknown.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An absent OAUTH_PROXY_PORT reads as port zero.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A port above 65535 refuses boot.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An unreadable OAUTH_PROXY_PORT refuses boot.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A blank timeout key reads as that key's default.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An unreadable timeout key reads as that key's default.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The upstream idle timeout default is ten minutes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The downstream keepalive default comes from the keepalive module.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "The parsed settings carry no environment key beyond the seven declared keys.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A blank OAUTH_PROXY_VERSION refuses boot.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A whitespace-only OAUTH_PROXY_AGENT_ID parses as an agent id.",
    },
  ],
} as const satisfies Module
