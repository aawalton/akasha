import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const holdRegistry = {
  id: "01a0623c-6939-7f9a-848d-be904e3cf57c",
  type: "page-type/module",
  slug: "hold-registry",
  definition: "what a gateway is holding open, counted and aged",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Entering a hold hands back the handle exiting needs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A snapshot counts the holds entered and not yet exited.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two holds entered at the same millisecond are two holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Exiting a handle already exited changes nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Exiting a handle the registry never entered changes nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A snapshot of an empty registry reports the oldest age as null rather than zero.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A snapshot ages the oldest hold from the earliest start still held.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The oldest hold is found in any order the holds were entered in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An age is never below zero.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A hold never exited is held for the life of the process.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A caller that enters a hold exits that hold on the paths a request can end by.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a clock.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here knows the request a hold is waiting on.",
    },
  ],
} as const satisfies Module
