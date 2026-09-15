import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const proxyStart = {
  id: "01a063af-ee63-7655-8598-ffbe6f7b0d22",
  type: "module",
  slug: "proxy-start",
  definition: "what starting a gateway is told and what a started gateway hands back",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here runs.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A gateway is started with the port that gateway is asked to bind.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A gateway is started with the root every account is read under.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A started gateway hands back the port that gateway bound.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The port handed back is a number rather than a port that may be absent.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A started gateway hands back the stop that closes the gateway.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A started gateway hands back the flush that ends every stream held open.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A flush is told the reason every stream is ending.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every option beside the port and the root is optional.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The effects a gateway reaches accounts through may be handed in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The read answering the fallback provider may be handed in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The directory a transport row lands in is handed in as a call rather than a path.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The idle span and the keepalive span are named in milliseconds.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A unix socket path handed in is where remote control is listened for.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The subagents held as stopped may be handed in.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement:
        "A caller has the answer starting a gateway hands back for as long as that gateway runs.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No option here has a token.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No option here has an account name.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "Nothing a gateway runs reads the refresh outcome hook these options have.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "Nothing a gateway runs reads the terminal test these options have.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement:
        "A refresh outcome is named here while no module under this domain makes a refresh outcome.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "The root is required here while the effects handed in make that root unread.",
    },
  ],
} as const satisfies Module
