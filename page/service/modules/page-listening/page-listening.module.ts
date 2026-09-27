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
      statement:
        "Writes, follows and streams are answered on the thread that listens, and reads on reading threads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A read arriving while no reading thread is running is answered where it arrived.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "What a read on a reading thread worked out it read is kept where the service listens.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The writer lands only once the reading threads have finished the reads they hold.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Running this module's file starts the service.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The service reads a seat's turn again each time the seat's transcript grows.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Importing this module's file starts nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The slug is read off the service's own page rather than spelled here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An answer taking a second or more is logged with its path, time, asker and question.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The thread held two seconds or more is logged with how long and the memory held.",
    },
  ],
} as const satisfies Module
