import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageEntryWriting = {
  id: "01a06196-4d21-7000-9c3a-2f5b8e1c4a70",
  type: "page-type/module",
  slug: "page-entry-writing",
  definition: "the files holding a page's entry values",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One value is written as one JSON object on one line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row's keys are written in the order the row has those keys.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every line closes with a newline.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A property with no value is written as one file holding nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A property's values are divided across the numbered files beside the page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A division is made only where the values run past the ceiling handed in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No file a division makes runs past that ceiling.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A ceiling is counted in bytes rather than in characters.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line handed over already formed is divided as handed rather than made again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One value running past the ceiling alone is refused rather than divided.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That refusal names the file the value was bound for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The files are named in the order the values were handed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The values written here are read back by `page-entries` in the order written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A property naming what alone writes it has every other write of its rows refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That refusal names the writer to hand the rows to.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An ending handed over under such a property is no write of its rows.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads or writes the disk.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here mints an id.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here judges a value against the shape declaring that value.",
    },
  ],
} as const satisfies Module
