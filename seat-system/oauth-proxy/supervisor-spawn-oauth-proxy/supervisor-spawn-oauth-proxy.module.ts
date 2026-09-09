import type { Module } from "@akasha/code/module"

export const supervisorSpawnOauthProxy = {
  id: "01a06876-abda-7018-ac05-91daba56bc7b",
  pageTypeSlug: "module",
  type: "module",
  slug: "supervisor-spawn-oauth-proxy",
  definition: "spawning the oauth proxy, or adopting one already there",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A gateway busy is not a gateway dead.",
    },
    {
      invariantKind: "departure",
      statement: "One health deadline serves adopting a gateway and watching one alike.",
    },
    {
      invariantKind: "departure",
      statement: "The port an adopted Claude points at is the only port a fresh gateway binds.",
    },
    {
      invariantKind: "departure",
      statement: "A holder of that port belonging to another agent is left running.",
    },
    {
      invariantKind: "departure",
      statement: "The gateway's error stream goes to a file rather than to the seat's terminal.",
    },
    {
      invariantKind: "departure",
      statement: "An error stream whose file will not open is discarded rather than inherited.",
    },
  ],
} as const satisfies Module
