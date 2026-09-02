import type { Module } from "@akasha/code-system/module"

export const idleTimeout = {
  id: "01a0623c-6939-733d-a2e2-720ebbb1d28d",
  pageTypeSlug: "module",
  slug: "idle-timeout",
  definition: "an upstream fetch aborted where no bytes arrive for a span",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A guard fires only where the idle span passes with no reset.",
    },
    {
      invariantKind: "departure",
      statement: "A reset restarts the whole idle span.",
    },
    {
      invariantKind: "departure",
      statement: "A reset replaces the armed fire rather than adding a fire.",
    },
    {
      invariantKind: "departure",
      statement: "A guard that fires aborts the signal the guarded fetch was given.",
    },
    {
      invariantKind: "departure",
      statement: "A guard aborts with a DOMException named TimeoutError.",
    },
    {
      invariantKind: "departure",
      statement: "The abort message opens with the token a reader matches an idle timeout by.",
    },
    {
      invariantKind: "departure",
      statement: "A stopped guard is stopped for good.",
    },
    {
      invariantKind: "constraint",
      statement: "A caller that arms a guard stops that guard on the paths a response can end by.",
    },
    {
      invariantKind: "departure",
      statement: "A guarded fetch hands the guard back for the caller to reset on each chunk.",
    },
    {
      invariantKind: "departure",
      statement: "A fetch given no spec is left unguarded.",
    },
    {
      invariantKind: "departure",
      statement: "A fetch given an idle span of zero or less is left unguarded.",
    },
    {
      invariantKind: "departure",
      statement: "A fetch that throws leaves the guard stopped before the error goes on.",
    },
    {
      invariantKind: "departure",
      statement: "The timers are handed in so a test needs no wait.",
    },
    {
      invariantKind: "gap",
      statement: "A guard that has already fired arms again on a later reset.",
    },
    {
      invariantKind: "gap",
      statement: "An abort signal the caller passed in is dropped where a guard is armed.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the bytes the guard is waiting for.",
    },
  ],
} as const satisfies Module
