import type { Module } from "../../../../../code-system/modules/module.page-type.ts"

export const beatDrawing = {
  id: "01a0728f-6afc-76a1-acde-2cdaeed6213c",
  pageTypeSlug: "module",
  slug: "beat-drawing",
  definition: "what the agents panel and the status bar draw, neither announced by a file",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A fleet is read by the reader that already read it rather than by new code.",
    },
    {
      invariantKind: "departure",
      statement: "The fleet is read once for the workstation rather than once for each window.",
    },
    {
      invariantKind: "departure",
      statement: "The working turn's color is read off its page on every beat rather than held.",
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
      statement: "A group answering no stoplights was not read, every group naming at least one.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a file or holds a timer.",
    },
  ],
} as const satisfies Module
