import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const serviceAlerting = {
  id: "01a0821e-fce5-7c36-a9bf-49d374faeb31",
  type: "module",
  slug: "service-alerting",
  definition: "which persona is told a service is broken, and how seldom she is told it again",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The persona told is the nearest persona championing a page above the service.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page is climbed by the domain with it until a champion is reached.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A climb coming back on itself ends rather than running away.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A service no page above it champions is told to the persona stated instead.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A telling carried to somebody else says who it was meant for and why nothing reached them.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The reason it names is closed with a stop once however the reason arrived.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A telling states the moment that telling was seen.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No telling says how long ago what it carries happened.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A service breaking is told at once.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A service broken without pause is told again once the cooling has run out.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The cooling is a day of being broken without pause.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A service that mends is held by nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The day a service broke is kept across the tellings of that one outage.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A mark that is no instant is owed a telling rather than swallowed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Deciding never moves the mark saying the persona was told.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here sends a message or reads a unit or opens a file.",
    },
  ],
} as const satisfies Module
