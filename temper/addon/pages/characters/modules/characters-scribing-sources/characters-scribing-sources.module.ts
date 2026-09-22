import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersScribingSources = {
  id: "01a062ed-39c9-700c-9df3-7f4288c3c504",
  type: "page-type/module",
  slug: "characters-scribing-sources",
  definition: "how far a character is through the runs of content earning a scribing script",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The nearest unfinished tier of a source is the only tier that source reports.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "The motifs a source drops are not counted.",
    },
  ],
} as const satisfies Module
