import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const lrclibClient = {
  id: "01a06262-ff4c-7004-99a6-b15f63fddbd0",
  type: "page-type/module",
  slug: "lrclib-client",
  definition: "LRCLIB asked for the words of a song",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/constraint",
      statement: "LRCLIB is asked no more than once every 250 milliseconds.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One queue has every ask this module makes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The queue is per process.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An ask that fails waits as long as an ask that answers.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A song is asked for by its title and its artist's name together.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An answer that is no 200 is thrown rather than returned.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No test here reaches LRCLIB.",
    },
  ],
} as const satisfies Module
