import type { Module } from "@akasha/code/module"

export const lrclibClient = {
  id: "01a06262-ff4c-7004-99a6-b15f63fddbd0",
  pageTypeSlug: "module",
  type: "module",
  slug: "lrclib-client",
  definition: "LRCLIB asked for the words of a song",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "LRCLIB is asked no more than once every 250 milliseconds.",
    },
    {
      invariantKind: "departure",
      statement: "One queue has every ask this module makes.",
    },
    {
      invariantKind: "departure",
      statement: "The queue is per process.",
    },
    {
      invariantKind: "departure",
      statement: "An ask that fails waits as long as an ask that answers.",
    },
    {
      invariantKind: "departure",
      statement: "A song is asked for by its title and its artist's name together.",
    },
    {
      invariantKind: "departure",
      statement: "An answer that is no 200 is thrown rather than returned.",
    },
    {
      invariantKind: "absence",
      statement: "No test here reaches LRCLIB.",
    },
  ],
} as const satisfies Module
