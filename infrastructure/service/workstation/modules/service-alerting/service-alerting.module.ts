import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const serviceAlerting = {
  id: "01a0821e-fce5-7c36-a9bf-49d374faeb31",
  type: "page-type/module",
  slug: "service-alerting",
  definition: "which persona is told a service is broken, and how seldom she is told it again",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The persona told is the nearest persona championing a page above the service.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page is climbed by the domain with it until a champion is reached.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A climb coming back on itself ends rather than running away.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service no page above it champions is told to the persona stated instead.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service stating it is not told is told to nobody.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service stating it is not told is held by nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A telling carried to somebody else says who it was meant for and why nothing reached them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The reason it names is closed with a stop once however the reason arrived.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A telling states the moment that telling was seen.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No telling says how long ago what it carries happened.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service breaking is told at once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A service still broken is told again once the cooling on its last telling has run out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The cooling is a day since the last telling.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service that mends is held until the cooling on its last telling runs out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The day a service broke is kept across the tellings of that one outage.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A mark that is no instant is owed a telling rather than swallowed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Deciding never moves the mark saying the persona was told.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here sends a message or reads a unit or opens a file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service held only for its cooling states no day it broke.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service breaking again after a mend states the day it broke again.",
    },
  ],
} as const satisfies Module
