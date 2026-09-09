import type { Module } from "@akasha/code/module"

export const dayLanding = {
  id: "01a076f8-6890-78c5-bfe3-30435fc02625",
  pageTypeSlug: "module",
  slug: "day-landing",
  definition: "the files a landing writes beside the day that landing lands rows on",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A day page declares the stretches beside that day.",
    },
    {
      invariantKind: "departure",
      statement: "A reader reaches a stretch through the declaration its day page has.",
    },
    {
      invariantKind: "departure",
      statement: "A day carrying rows and declaring no stretches reads as a day with no stretch.",
    },
    {
      invariantKind: "departure",
      statement: "The declaration is written the first time a row lands on a day.",
    },
    {
      invariantKind: "departure",
      statement: "A day page already declaring the stretches is left unchanged.",
    },
    {
      invariantKind: "departure",
      statement: "The rows of the last day a landing writes are handed to the write as the body.",
    },
    {
      invariantKind: "departure",
      statement: "A day page a landing rewrites is written whether that day is the last or not.",
    },
    {
      invariantKind: "absence",
      statement: "A row arrives here already composed.",
    },
    {
      invariantKind: "absence",
      statement: "No call here reaches git.",
    },
  ],
} as const satisfies Module
