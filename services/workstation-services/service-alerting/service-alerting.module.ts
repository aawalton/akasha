import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const serviceAlerting = {
  id: "01a0821e-fce5-7c36-a9bf-49d374faeb31",
  pageTypeSlug: "module",
  slug: "service-alerting",
  definition: "which persona is told a service is broken, and how seldom she is told it again",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The persona told is the nearest persona championing a page above the service.",
    },
    {
      invariantKind: "departure",
      statement: "A page is climbed by the domain with it until a champion is reached.",
    },
    {
      invariantKind: "departure",
      statement: "A climb coming back on itself ends rather than running away.",
    },
    {
      invariantKind: "departure",
      statement: "A service no page above it champions is told to the persona stated instead.",
    },
    {
      invariantKind: "departure",
      statement: "A service breaking is told at once.",
    },
    {
      invariantKind: "departure",
      statement: "A service broken without pause is told again once the cooling has run out.",
    },
    {
      invariantKind: "departure",
      statement: "The cooling is a day of being broken without pause.",
    },
    {
      invariantKind: "departure",
      statement: "A service that mends is held by nothing.",
    },
    {
      invariantKind: "departure",
      statement: "The day a service broke is kept across the tellings of that one outage.",
    },
    {
      invariantKind: "departure",
      statement: "A mark that is no instant is owed a telling rather than swallowed.",
    },
    {
      invariantKind: "departure",
      statement: "Deciding never moves the mark saying the persona was told.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here sends a message or reads a unit or opens a file.",
    },
  ],
} as const satisfies Module
