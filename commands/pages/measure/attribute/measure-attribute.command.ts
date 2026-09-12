import type { Command } from "akasha/commands/command.page-type.types.ts"

export const measureAttribute = {
  id: "01a07803-0b6a-7fdb-9b43-0d4b23b072ee",
  type: "command",
  slug: "measure-attribute",
  definition: "the command saying each attribute's level and the total behind that level",
  code: "ts",
  test: "ts",
  changeKind: "change-mechanical",

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
  name: "attribute",
} as const satisfies Command
