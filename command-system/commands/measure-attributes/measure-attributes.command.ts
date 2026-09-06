import type { Command } from "../command.page-type.ts"

export const measureAttributes = {
  id: "01a07803-0b6a-7fdb-9b43-0d4b23b072ee",
  pageTypeSlug: "command",
  slug: "measure-attributes",
  definition: "the command saying what each attribute counted for Alan today",
  code: "ts",
  test: "ts",
  changeKindSlug: "change-mechanical",
  helpNotes: [
    "the reading is worked out at the moment of asking rather than read off the tiles.",
    "an attribute is answered for the day Alan is in rather than for the calendar date.",
    "a figure is floored to two decimal places, so a figure short of a hundredth reads `0`.",
    "an attribute nothing can be read for is named beneath the figures rather than drawn as zero.",
    "the attributes sit in the order their readouts state.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Each figure is worked out when the command is called.",
    },
    {
      invariantKind: "departure",
      statement: "A figure is floored to two decimal places rather than rounded.",
    },
    {
      invariantKind: "departure",
      statement: "An attribute that could not be read is named rather than answered as zero.",
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
