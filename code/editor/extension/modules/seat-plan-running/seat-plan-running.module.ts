import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatPlanRunning = {
  id: "01a0686b-bfe9-72a1-aae1-064e9d606367",
  type: "module",
  slug: "seat-plan-running",
  definition: "an act taken on a seat, from the row it was invoked on to the read that follows it",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An act invoked on a row that is no seat does nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The plan is made from the state the row was drawn carrying.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A prompt is shown as a modal.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Nothing runs while a prompt is open.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Anything but the confirming answer leaves the seat untouched.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A declined act is written to the output rather than passing silently.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The fleet is read again once the act is done.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here knows the work a step does.",
    },
  ],
} as const satisfies Module
