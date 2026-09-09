import type { Command } from "../../../command.page-type.ts"

export const measurePersonas = {
  id: "01a082e9-18fb-7213-bd29-f105c8f9dd20",
  pageTypeSlug: "command",
  slug: "measure-personas",
  definition: "the command saying each persona's relationship level and the total behind it",
  code: "ts",
  test: "ts",
  changeKind: "change-mechanical",
  helpNotes: [
    "the total is the one kept beside the persona's own page rather than added up again here.",
    "`akasha refresh personas` rebuilds a total that has fallen behind the days.",
    "a hundred messages Alan wrote is one point, and a rung costs three times what the rung before it cost.",
    "a level is a whole number, and a total is floored to two decimal places.",
    "a persona carrying no total is counted beneath the lines rather than drawn at level 0.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Each total is read off the persona's page rather than worked out here.",
    },
    {
      invariantKind: "departure",
      statement:
        "The points a rung takes are read off the closeness levels rather than spelled here.",
    },
    {
      invariantKind: "departure",
      statement: "A line says a persona's name before her level, and her level before her total.",
    },
    {
      invariantKind: "departure",
      statement: "The personas sit with the largest total first.",
    },
    {
      invariantKind: "departure",
      statement: "Two personas on one total sit in the order of their names.",
    },
    {
      invariantKind: "departure",
      statement: "A total is floored to two decimal places rather than rounded.",
    },
    {
      invariantKind: "departure",
      statement: "Each column is written to the width of the widest entry in that column.",
    },
    {
      invariantKind: "departure",
      statement: "A persona with no total is counted rather than answered as zero.",
    },
    {
      invariantKind: "departure",
      statement: "A run answering no persona at all is refused.",
    },
    {
      invariantKind: "absence",
      statement: "A run adds no day up.",
    },
    {
      invariantKind: "absence",
      statement: "A run turns no figure into a color.",
    },
  ],
} as const satisfies Command
