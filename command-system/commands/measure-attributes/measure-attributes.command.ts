import type { Command } from "../command.page-type.ts"

export const measureAttributes = {
  id: "01a07803-0b6a-7fdb-9b43-0d4b23b072ee",
  pageTypeSlug: "command",
  slug: "measure-attributes",
  definition: "the command saying each attribute's level and the total behind that level",
  code: "ts",
  test: "ts",
  changeKindSlug: "change-mechanical",
  helpNotes: [
    "the level and the total are worked out at the moment of asking rather than read off the tiles.",
    "a total is an attribute's daily points added up over the days from 2026-09-06 onward.",
    "a level is the highest rung a total has reached, each climb costing 10, 10, 20, 30, 50, 80 points and on up the Fibonacci numbers.",
    "a level is a whole number, and a total is floored to two decimal places, so a total short of a hundredth reads `0.00`.",
    "an attribute nothing can be read for is named beneath the lines rather than drawn at level 0.",
    "the attributes sit in the order their readouts state.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Each figure is worked out when the command is called.",
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
      statement:
        "A total is the sum of an attribute's points over the days from 2026-09-06 onward.",
    },
    {
      invariantKind: "departure",
      statement: "A level is read from the levelling module rather than worked out here.",
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
      statement: "An attribute that could not be read is named rather than answered as zero.",
    },
    {
      invariantKind: "departure",
      statement:
        "An attribute that could not be read is left out of the lines rather than shown at level 0.",
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
