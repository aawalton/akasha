import type { Module } from "@akasha/code-system/module"

export const readoutUnread = {
  id: "01a0657f-4cdb-7000-ae3c-a06d78dc0854",
  pageTypeSlug: "module",
  slug: "readout-unread",
  definition: "the lights a group draws that carry no reading",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A group can hold exactly the right number of lights and none of the readings.",
    },
    {
      invariantKind: "constraint",
      statement: "A count of lights is blind to whether a reading is behind each one.",
    },
    {
      invariantKind: "departure",
      statement: "A light carrying a figure is read.",
    },
    {
      invariantKind: "departure",
      statement: "The color a light came out does not decide whether that light is read.",
    },
    {
      invariantKind: "departure",
      statement: "A reading of zero is a reading.",
    },
    {
      invariantKind: "departure",
      statement: "An empty figure is what names a light as unread.",
    },
    {
      invariantKind: "departure",
      statement: "A light carrying no figure is named beside what the absence is.",
    },
    {
      invariantKind: "departure",
      statement: "A light with no figure and no stated hold is counted as never taken.",
    },
    {
      invariantKind: "departure",
      statement: "A group drawing a light that carries no reading is refused rather than answered.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names each unread light by its label.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal says what each absence is.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal sends the reader to the readout's workstation service.",
    },
    {
      invariantKind: "departure",
      statement: "A reading is read through the reader the status bar hands in.",
    },
    {
      invariantKind: "constraint",
      statement: "The relay holds its readings in memory alone.",
    },
    {
      invariantKind: "departure",
      statement: "The relay's own reader is therefore no reader to check a group with.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides which groups are drawn.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here takes a reading.",
    },
  ],
} as const satisfies Module
