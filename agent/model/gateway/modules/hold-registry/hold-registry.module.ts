import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const holdRegistry = {
  id: "01a0623c-6939-7f9a-848d-be904e3cf57c",
  type: "module",
  slug: "hold-registry",
  definition: "what a gateway is holding open, counted and aged",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Entering a hold hands back the handle exiting needs.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A snapshot counts the holds entered and not yet exited.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Two holds entered at the same millisecond are two holds.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Exiting a handle already exited changes nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Exiting a handle the registry never entered changes nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A snapshot of an empty registry reports the oldest age as null rather than zero.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A snapshot ages the oldest hold from the earliest start still held.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The oldest hold is found in any order the holds were entered in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An age is never below zero.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A hold never exited is held for the life of the process.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A caller that enters a hold exits that hold on the paths a request can end by.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a clock.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here knows the request a hold is waiting on.",
    },
  ],
} as const satisfies Module
