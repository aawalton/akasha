import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inFlight = {
  id: "01a06421-4b72-78c7-b4b7-9bbcf4a60b46",
  type: "module",
  slug: "in-flight",
  definition: "the requests a gateway has taken in and not yet answered",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A tracker counts the requests begun and not yet ended.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A fresh tracker counts nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Beginning a request raises the count.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Ending a request lowers the count.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An end met while the count is zero leaves the count at zero.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A count never falls below zero.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An idle wait asked for while the count is zero reports the tracker idle.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An idle wait asked for while the count is zero arms no timer.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An idle wait resolves on the end that brings the count to zero.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every idle wait a tracker has resolves on that same end.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An idle wait resolving on an end reports the tracker idle.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An idle wait outliving its span reports the tracker busy.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An idle wait is resolved the first time and never again.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A resolved idle wait is taken out of the waiting a tracker has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A resolved idle wait stops the timer that wait armed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A timer firing while that timer is being armed is stopped once the arming returns.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The timers are handed in so a test needs no wait.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The real timer is unreferenced so a pending wait holds no process up.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A caller that begins a request ends that request on the paths a request ends by.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here knows the body a request carries.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a clock.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes a line.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "Nothing under this domain asks a tracker for an idle wait.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A request begun after an idle wait resolved leaves that wait resolved.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A tracker counts every request alike rather than counting each path apart.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "The old tracker at `tools/lib/model-gateway/gateway.ts` never stopped its timer.",
    },
  ],
} as const satisfies Module
