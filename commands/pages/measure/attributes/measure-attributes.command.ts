import type { Command } from "../../../command.page-type.types.ts"

export const measureAttributes = {
  id: "01a07803-0b6a-7fdb-9b43-0d4b23b072ee",
  pageTypeSlug: "command",
  type: "command",
  slug: "measure-attributes",
  definition: "the command saying each attribute's level and the total behind that level",
  code: "ts",
  test: "ts",
  changeKind: "change-mechanical",
  helpNotes: [
    "the total is the one kept beside the attribute's own page rather than added up again here.",
    "`akasha refresh attributes` rebuilds a total that has fallen behind the days.",
    "a level is the highest rung a total has reached, each climb costing 10, 10, 20, 30, 50, 80 points and on up the Fibonacci numbers.",
    "a level is a whole number, and a total is floored to two decimal places, so a total short of a hundredth reads `0.00`.",
    "an attribute carrying no total is named beneath the lines rather than drawn at level 0.",
    "the attributes sit in the order their readouts state.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Each total is read off the attribute's page rather than worked out here.",
    },
    {
      invariantKind: "departure",
      statement: "A line says an attribute's label before that attribute's level.",
    },
    {
      invariantKind: "departure",
      statement: "A line says an attribute's level before that attribute's total.",
    },
    {
      invariantKind: "departure",
      statement: "The attribute a line is for is the one that line's readout names.",
    },
    {
      invariantKind: "departure",
      statement: "A level is read from the attribute's level property rather than worked out here.",
    },
    {
      invariantKind: "departure",
      statement: "A level is written as a whole number with no decimal place.",
    },
    {
      invariantKind: "departure",
      statement: "A total is floored to two decimal places rather than rounded.",
    },
    {
      invariantKind: "departure",
      statement: "A total is written to two decimal places whatever digits that total has.",
    },
    {
      invariantKind: "departure",
      statement: "Each column is written to the width of the widest entry in that column.",
    },
    {
      invariantKind: "departure",
      statement: "An attribute with no total is named rather than answered as zero.",
    },
    {
      invariantKind: "departure",
      statement:
        "An attribute with no total is left out of the lines rather than shown at level 0.",
    },
    {
      invariantKind: "absence",
      statement: "A run adds no day up and asks no store what Alan tracked.",
    },
    {
      invariantKind: "departure",
      statement: "The label and the order of an attribute are read from its readout's page.",
    },
    {
      invariantKind: "departure",
      statement: "A run answering no attribute at all is refused.",
    },
    {
      invariantKind: "absence",
      statement: "A run keeps no reading beside a readout.",
    },
    {
      invariantKind: "absence",
      statement: "A run turns no figure into a color.",
    },
  ],
} as const satisfies Command
