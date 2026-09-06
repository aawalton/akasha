import type { Module } from "../../../../../code-system/modules/module.page-type.ts"

export const beatDrawing = {
  id: "01a0728f-6afc-76a1-acde-2cdaeed6213c",
  pageTypeSlug: "module",
  slug: "beat-drawing",
  definition: "what the status bar draws, whose stoplights no file announces",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A stoplight section is reached over HTTP rather than read off a file.",
    },
    {
      invariantKind: "departure",
      statement:
        "The status bar is read once for the workstation rather than once for each window.",
    },
    {
      invariantKind: "departure",
      statement: "The fleet's spend is read off the account pages rather than asked of a command.",
    },
    {
      invariantKind: "departure",
      statement: "The spend rides the stoplights' beat rather than a watch of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A section of the status bar that could not be read is null.",
    },
    {
      invariantKind: "departure",
      statement: "One section failing leaves the other three read.",
    },
    {
      invariantKind: "departure",
      statement: "Every group names a stoplight.",
    },
    {
      invariantKind: "departure",
      statement: "A group answering no stoplights was not read.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a file or holds a timer.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here draws the agents panel.",
    },
  ],
} as const satisfies Module
