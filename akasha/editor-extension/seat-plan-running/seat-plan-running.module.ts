import type { Module } from "../../code-system/modules/module.page-type.ts"

export const seatPlanRunning = {
  id: "01a0686b-bfe9-72a1-aae1-064e9d606367",
  pageTypeSlug: "module",
  slug: "seat-plan-running",
  definition: "an act taken on a seat, from the row it was invoked on to the read that follows it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An act invoked on what is no seat does nothing.",
    },
    {
      invariantKind: "departure",
      statement: "The plan is made from the state the row was drawn carrying.",
    },
    {
      invariantKind: "departure",
      statement: "A prompt is shown as a modal, so nothing runs while it stands.",
    },
    {
      invariantKind: "departure",
      statement: "Anything but the confirming answer leaves the seat untouched.",
    },
    {
      invariantKind: "departure",
      statement: "A declined act is written to the output rather than passing silently.",
    },
    {
      invariantKind: "departure",
      statement: "The fleet is read again once the act is done.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here knows what a step does.",
    },
  ],
} as const satisfies Module
