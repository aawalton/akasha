import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageListening = {
  id: "01a05a43-5af9-7b66-ac4c-33e3f06d1c87",
  type: "page-type/module",
  slug: "page-listening",
  definition: "the port a page query arrives on, and what is bound to it",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The port and the host names are read off the service's page by its slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A host name that will not bind leaves the rest of the host names bound.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A host name that will not bind is published beside the page describing the service.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A host name that will not bind is tried again until that host name binds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service listening on every host name its page states publishes none unbound.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What is published is what this run found rather than what an earlier run found.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing listens where no host name bound.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One writer is behind every host name bound.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each server bound answers every question the same way a handed request is answered.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Running this module's file starts the service.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Importing this module's file starts nothing.",
    },
  ],
} as const satisfies Module
