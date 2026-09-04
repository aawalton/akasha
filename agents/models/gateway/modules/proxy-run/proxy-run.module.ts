import type { Module } from "@akasha/code-system/module"

export const proxyRun = {
  id: "01a069b9-74bc-7728-868d-54f66ae34d14",
  pageTypeSlug: "module",
  slug: "proxy-run",
  definition: "starting one gateway on the akasha entry and saying the port it answered",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The entry started is the akasha one rather than the one a supervisor spawns.",
    },
    {
      invariantKind: "departure",
      statement: "The gateway started has a port of its own and a socket of its own.",
    },
    {
      invariantKind: "departure",
      statement: "The port answered is the first line the gateway prints.",
    },
    {
      invariantKind: "departure",
      statement: "A gateway not asked to be kept is stopped once it has printed its port.",
    },
    {
      invariantKind: "departure",
      statement: "A gateway asked to be kept is let go of rather than waited on.",
    },
    {
      invariantKind: "departure",
      statement: "The console and the errors are written under the log directory named.",
    },
    {
      invariantKind: "absence",
      statement: "No gateway is started under an agent id a seat answers to.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a token.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads an account.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here makes a request of a gateway.",
    },
    {
      invariantKind: "gap",
      statement: "The version given is not computed from the entry.",
    },
  ],
} as const satisfies Module
