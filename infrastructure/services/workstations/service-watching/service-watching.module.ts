import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const serviceWatching = {
  id: "01a0821e-fce6-7373-89a1-600a7260bb4f",
  type: "module",
  slug: "service-watching",
  definition: "the run telling each persona which of the services she answers for is broken",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The outages carried between runs are kept beside the units rather than in a page.",
    },
    {
      invariantKind: "departure",
      statement: "A ledger that will not parse is read as holding nothing rather than throwing.",
    },
    {
      invariantKind: "departure",
      statement: "An entry stating no day the service broke is dropped rather than carried.",
    },
    {
      invariantKind: "departure",
      statement: "A service is marked told only once the telling has landed.",
    },
    {
      invariantKind: "departure",
      statement: "A telling nobody takes is carried to the persona stated instead.",
    },
    {
      invariantKind: "departure",
      statement: "A telling that lands nowhere at all leaves that service to be told again.",
    },
    {
      invariantKind: "departure",
      statement: "The tellings after a telling that lands nowhere still go out.",
    },
    {
      invariantKind: "departure",
      statement: "Services that could not be read end the run rather than reading as well.",
    },
    {
      invariantKind: "departure",
      statement: "Every service whose verdict changed is left carrying this run's finding.",
    },
    {
      invariantKind: "departure",
      statement: "This run's own page is left carrying the moment this run looked.",
    },
    {
      invariantKind: "departure",
      statement: "A verdict is left before any telling.",
    },
    {
      invariantKind: "departure",
      statement: "A run that cannot tell still leaves a verdict.",
    },
    {
      invariantKind: "gap",
      statement: "Something tells Alan when this run is the run that is broken.",
    },
  ],
} as const satisfies Module
