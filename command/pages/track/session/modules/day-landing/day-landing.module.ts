import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const dayLanding = {
  id: "01a076f8-6890-78c5-bfe3-30435fc02625",
  type: "module",
  slug: "day-landing",
  definition: "the files a landing writes beside the day that landing lands rows on",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A day page declares the stretches beside that day.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reader reaches a stretch through the declaration its day page has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A day carrying rows and declaring no stretches reads as a day with no stretch.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The declaration is written the first time a row lands on a day.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A day page already declaring the stretches is left unchanged.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The rows of the last day a landing writes are handed to the write as the body.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A day page a landing rewrites is written whether that day is the last or not.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A row arrives here already composed.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No call here reaches git.",
    },
  ],
} as const satisfies Module
