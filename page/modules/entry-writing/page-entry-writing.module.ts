import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageEntryWriting = {
  id: "01a06196-4d21-7000-9c3a-2f5b8e1c4a70",
  type: "module",
  slug: "page-entry-writing",
  definition: "the files a page's entry values are written into",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "One value is written as one JSON object on one line.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A row's keys are written in the order the row has those keys.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every line closes with a newline.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A property with no value is written as one file holding nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A property's values are divided across the numbered files beside the page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A division is made only where the values run past the ceiling handed in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "No file a division makes runs past that ceiling.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A ceiling is counted in bytes rather than in characters.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A line handed over already formed is divided as handed rather than made again.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One value running past the ceiling alone is refused rather than divided.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That refusal names the file the value was bound for.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The files are named in the order the values were handed over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The values written here are read back by `page-entries` in the order written.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads or writes the disk.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here mints an id.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here judges a value against the shape declaring that value.",
    },
  ],
} as const satisfies Module
