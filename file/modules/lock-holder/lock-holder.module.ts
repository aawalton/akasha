import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const lockHolder = {
  id: "01a05231-61c5-7336-8fa7-302f778209a9",
  type: "module",
  slug: "lock-holder",
  definition: "the process a lock's mark names, and whether it is still the one that took the lock",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A mark names the process that wrote the mark first and the moment that process started second.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The two are parted by a space.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A holder is weighed by the moment its process started as well as its number.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The moment a process started is read from `/proc`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A pid nothing is running under answers unknown rather than failing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An unknown moment on either side leaves the holder weighed by its number alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A mark that cannot be read is answered as no holder.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A mark that is empty is answered as no holder.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A mark that names no number is answered as no holder.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "No holder is an answer rather than a failure to read a holder.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here takes a lock.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here releases a lock.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here knows where a lock is.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "The input read is a pid and a mark.",
    },
  ],
} as const satisfies Module
