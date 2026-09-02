import type { Module } from "@akasha/code-system/module"

export const proxyStart = {
  id: "01a063af-ee63-7655-8598-ffbe6f7b0d22",
  pageTypeSlug: "module",
  slug: "proxy-start",
  definition: "what starting a gateway is told and what a started gateway hands back",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here runs.",
    },
    {
      invariantKind: "departure",
      statement: "A gateway is started with the port that gateway is asked to bind.",
    },
    {
      invariantKind: "departure",
      statement: "A gateway is started with the root every account is read under.",
    },
    {
      invariantKind: "departure",
      statement: "A started gateway hands back the port that gateway bound.",
    },
    {
      invariantKind: "departure",
      statement: "The port handed back is a number rather than a port that may be absent.",
    },
    {
      invariantKind: "departure",
      statement: "A started gateway hands back the stop that closes the gateway.",
    },
    {
      invariantKind: "departure",
      statement: "A started gateway hands back the flush that ends every stream held open.",
    },
    {
      invariantKind: "departure",
      statement: "A flush is told the reason every stream is ending.",
    },
    {
      invariantKind: "departure",
      statement: "Every option beside the port and the root is optional.",
    },
    {
      invariantKind: "departure",
      statement: "The effects a gateway reaches accounts through may be handed in.",
    },
    {
      invariantKind: "departure",
      statement:
        "The directory a transport row lands in is handed in as a call rather than a path.",
    },
    {
      invariantKind: "departure",
      statement: "The idle span and the keepalive span are named in milliseconds.",
    },
    {
      invariantKind: "departure",
      statement: "A unix socket path handed in is where remote control is listened for.",
    },
    {
      invariantKind: "constraint",
      statement:
        "A caller holds what starting a gateway hands back for as long as that gateway runs.",
    },
    {
      invariantKind: "absence",
      statement: "No option here carries a token.",
    },
    {
      invariantKind: "absence",
      statement: "No option here carries an account name.",
    },
    {
      invariantKind: "gap",
      statement: "Nothing a gateway runs reads the refresh outcome hook these options carry.",
    },
    {
      invariantKind: "gap",
      statement: "Nothing a gateway runs reads the terminal test these options carry.",
    },
    {
      invariantKind: "gap",
      statement:
        "A refresh outcome is named here while no module under this domain makes a refresh outcome.",
    },
    {
      invariantKind: "gap",
      statement: "The root is required here while the effects handed in make that root unread.",
    },
  ],
} as const satisfies Module
