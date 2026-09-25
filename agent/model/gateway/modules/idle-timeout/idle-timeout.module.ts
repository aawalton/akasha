import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const idleTimeout = {
  id: "01a0623c-6939-733d-a2e2-720ebbb1d28d",
  type: "page-type/module",
  slug: "idle-timeout",
  definition: "an upstream fetch aborted where no bytes arrive for a span",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A guard fires only where the idle span passes with no reset.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reset restarts the whole idle span.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reset replaces the armed fire rather than adding a fire.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A guard that fires aborts the signal the guarded fetch was given.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A guard aborts with a DOMException named TimeoutError.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The abort message opens with the token a reader matches an idle timeout by.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stopped guard is stopped for good.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A caller that arms a guard stops that guard on the paths a response can end by.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A guarded fetch hands the guard back for the caller to reset on each chunk.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fetch given no spec is left unguarded.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fetch given an idle span at zero or below is left unguarded.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fetch that throws leaves the guard stopped before the error goes on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The timers are handed in so a test needs no wait.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A guard that has fired is stopped for good.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A guarded fetch aborts on the signal the caller passed in as well as on the guard.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the bytes the guard is waiting for.",
    },
  ],
} as const satisfies Module
