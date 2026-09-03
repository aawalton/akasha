import type { Module } from "../../code-system/modules/module.page-type.ts"

export const settledRefresh = {
  id: "01a064e4-627c-7e79-9f26-4239bd8cb95f",
  pageTypeSlug: "module",
  slug: "settled-refresh",
  definition: "a run put off until the quiet has lasted and the trigger that asked for the run",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A request restarts the quiet rather than adding a run.",
    },
    {
      invariantKind: "departure",
      statement: "The length of the quiet is asked for at each request rather than fixed once.",
    },
    {
      invariantKind: "departure",
      statement: "A caller passing a number is asked for the same length every time.",
    },
    {
      invariantKind: "departure",
      statement: "A request arriving while a run is in flight starts no second run.",
    },
    {
      invariantKind: "departure",
      statement: "Only the last trigger queued behind a run in flight is kept.",
    },
    {
      invariantKind: "departure",
      statement: "A run that throws is swallowed and the queued trigger is run all the same.",
    },
    {
      invariantKind: "departure",
      statement: "A run finishing to a queued trigger goes straight on rather than waiting again.",
    },
    {
      invariantKind: "departure",
      statement: "Disposing clears the timer and the queued trigger and stops no run in flight.",
    },
    {
      invariantKind: "departure",
      statement: "A request after disposal starts the quiet afresh.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here knows what a run does.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here knows what a trigger names.",
    },
  ],
} as const satisfies Module
