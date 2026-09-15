import type { Command } from "akasha/command/command.page-type.types.ts"

export const measurePersona = {
  id: "01a082e9-18fb-7213-bd29-f105c8f9dd20",
  type: "page-type/command",
  slug: "measure-persona",
  definition: "the command saying each persona's relationship level and the total behind it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A level is written as a whole number.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each total is read off the persona's page rather than worked out here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The points a rung takes are read off the closeness levels rather than spelled here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A line says a persona's name before her level and her level before her total.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The personas sit with the largest total first.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Two personas on one total sit in the order of their names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A total is floored to two decimal places rather than rounded.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each column is written to the width of the widest entry in that column.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A persona with no total is counted rather than answered as zero.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run answering no persona at all is refused.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A run adds no day up.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A run turns no figure into a color.",
    },
  ],
  name: "persona",
  arguments: [],
} as const satisfies Command
