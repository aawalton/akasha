import type { Module } from "@akasha/code-system/module"

export const apnsSending = {
  id: "01a069b6-bb6b-7ca0-81b1-b62e52519bbf",
  pageTypeSlug: "module",
  slug: "apns-sending",
  definition: "one alert handed to Apple's push service over a connection kept open",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A provider token is signed once and used again for fifty minutes.",
    },
    {
      invariantKind: "departure",
      statement: "One connection to Apple is opened and kept for every later send.",
    },
    {
      invariantKind: "departure",
      statement: "A connection that errored or closed is opened again on the next send.",
    },
    {
      invariantKind: "departure",
      statement: "A 410 answer and a bad device token both mark that token to be dropped.",
    },
    {
      invariantKind: "departure",
      statement: "Any other answer short of 200 is an error the caller is handed.",
    },
    {
      invariantKind: "departure",
      statement:
        "A send Apple has not answered inside twenty seconds is ended rather than awaited.",
    },
    {
      invariantKind: "departure",
      statement: "With the signing key unset no sender is made at all.",
    },
    {
      invariantKind: "departure",
      statement: "The reason no sender was made is handed back to the caller.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides who a push goes to.",
    },
  ],
} as const satisfies Module
