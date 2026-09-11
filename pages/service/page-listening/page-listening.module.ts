import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const pageListening = {
  id: "01a05a43-5af9-7b66-ac4c-33e3f06d1c87",
  type: "module",
  slug: "page-listening",
  definition: "the port a page query arrives on, and what is bound to it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The port is read from the page describing the service.",
    },
    {
      invariantKind: "departure",
      statement: "A page stating no port leaves nothing to listen on.",
    },
    {
      invariantKind: "departure",
      statement: "The host names bound are read from the page describing the service.",
    },
    {
      invariantKind: "departure",
      statement: "A page stating no host name leaves the loopback address bound alone.",
    },
    {
      invariantKind: "departure",
      statement: "A host name that will not bind leaves the rest of the host names bound.",
    },
    {
      invariantKind: "departure",
      statement:
        "A host name that will not bind is published beside the page describing the service.",
    },
    {
      invariantKind: "departure",
      statement: "A host name that will not bind is tried again until that host name binds.",
    },
    {
      invariantKind: "departure",
      statement: "A service listening on every host name its page states publishes none unbound.",
    },
    {
      invariantKind: "departure",
      statement: "What is published is what this run found rather than what an earlier run found.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing listens where no host name bound.",
    },
    {
      invariantKind: "departure",
      statement: "One writer is behind every host name bound.",
    },
    {
      invariantKind: "departure",
      statement:
        "Each server bound answers every question the same way a handed request is answered.",
    },
    {
      invariantKind: "departure",
      statement: "Running this module's file starts the service.",
    },
    {
      invariantKind: "absence",
      statement: "Importing this module's file starts nothing.",
    },
  ],
} as const satisfies Module
