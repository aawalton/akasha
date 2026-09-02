import type { Module } from "@akasha/code-system/module"

export const inFlight = {
  id: "01a06421-4b72-78c7-b4b7-9bbcf4a60b46",
  pageTypeSlug: "module",
  slug: "in-flight",
  definition: "the requests a gateway has taken in and not yet answered",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A tracker counts the requests begun and not yet ended.",
    },
    {
      invariantKind: "departure",
      statement: "A fresh tracker counts nothing.",
    },
    {
      invariantKind: "departure",
      statement: "Beginning a request raises the count.",
    },
    {
      invariantKind: "departure",
      statement: "Ending a request lowers the count.",
    },
    {
      invariantKind: "departure",
      statement: "An end met while the count is zero leaves the count at zero.",
    },
    {
      invariantKind: "departure",
      statement: "A count never falls below zero.",
    },
    {
      invariantKind: "departure",
      statement: "An idle wait asked for while the count is zero reports the tracker idle.",
    },
    {
      invariantKind: "departure",
      statement: "An idle wait asked for while the count is zero arms no timer.",
    },
    {
      invariantKind: "departure",
      statement: "An idle wait resolves on the end that brings the count to zero.",
    },
    {
      invariantKind: "departure",
      statement: "Every idle wait a tracker holds resolves on that same end.",
    },
    {
      invariantKind: "departure",
      statement: "An idle wait resolving on an end reports the tracker idle.",
    },
    {
      invariantKind: "departure",
      statement: "An idle wait outliving its span reports the tracker busy.",
    },
    {
      invariantKind: "departure",
      statement: "An idle wait is resolved the first time and never again.",
    },
    {
      invariantKind: "departure",
      statement: "A resolved idle wait is taken out of the waiting a tracker holds.",
    },
    {
      invariantKind: "departure",
      statement: "A resolved idle wait stops the timer that wait armed.",
    },
    {
      invariantKind: "departure",
      statement: "A timer firing while it is being armed is stopped once the arming returns.",
    },
    {
      invariantKind: "departure",
      statement: "The timers are handed in so a test needs no wait.",
    },
    {
      invariantKind: "departure",
      statement: "The real timer is unreferenced so a pending wait holds no process up.",
    },
    {
      invariantKind: "constraint",
      statement: "A caller that begins a request ends that request on the paths a request ends by.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here knows what a request carries.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a clock.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a line.",
    },
    {
      invariantKind: "gap",
      statement: "Nothing under this domain asks a tracker for an idle wait.",
    },
    {
      invariantKind: "gap",
      statement: "A request begun after an idle wait resolved leaves that wait resolved.",
    },
    {
      invariantKind: "gap",
      statement: "A tracker counts every request alike rather than counting each path apart.",
    },
    {
      invariantKind: "gap",
      statement: "The old tracker at `tools/lib/model-gateway/gateway.ts` never stopped its timer.",
    },
  ],
} as const satisfies Module
