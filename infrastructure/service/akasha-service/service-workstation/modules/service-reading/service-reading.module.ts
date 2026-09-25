import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const serviceReading = {
  id: "01a05a64-6ba1-7aaa-847b-316b27475e49",
  type: "page-type/module",
  slug: "service-reading",
  definition: "the workstation service a page states, read from the index and the page",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading naming no slug reaches every service.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Services are read from the pages the caller hands in, whether a checkout's or a commit's.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slug no page is filed under is refused by name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page that will not load refuses rather than reading as no service.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page missing a value a service needs refuses rather than reading as a service.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One page that refuses refuses the whole reading.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value stated as the wrong sort is read as though the value were not stated.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Whether a service is told is read from that service's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An option this system does not have is dropped rather than carried through.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service has one command line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A service handed a bundle runs that bundle, and any other runs the runner and names itself.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which services are handed a bundle is settled by the caller rather than here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A bundle handed in that no file sits at refuses rather than reaching a unit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A service is named on that command line by its slug rather than by the file holding its code.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The file that command line runs is answered for on its own as well.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "What a page spells of how it runs reaches no command line.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a unit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service is read with the origin the pages service answers on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That origin is the loopback and the port the pages service's own page states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A checkout stating no pages service leaves a service reading no origin.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The pages service's slug is read off its page rather than spelled here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller on this workstation reaches the pages service at the origin stated.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller with no origin stated reaches the pages service this checkout runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which caller wants that origin is nothing this module asks.",
    },
  ],
} as const satisfies Module
