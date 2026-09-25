import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inFlight = {
  id: "01a06421-4b72-78c7-b4b7-9bbcf4a60b46",
  type: "page-type/module",
  slug: "in-flight",
  definition: "the requests a gateway has taken in and not yet answered",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A tracker counts the requests begun and not yet ended.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fresh tracker counts nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Beginning a request raises the count.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Ending a request lowers the count.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An end met while the count is zero leaves the count at zero.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A count never falls below zero.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A tracker has no wait for the count to reach zero.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A caller that begins a request ends that request on the paths a request ends by.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here knows the body a request carries.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a clock.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A tracker counts every request alike, so a path counted apart has a tracker of its own.",
    },
  ],
} as const satisfies Module
