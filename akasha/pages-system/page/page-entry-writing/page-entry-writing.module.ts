import type { Module } from "@akasha/code-system/module"

export const pageEntryWriting = {
  id: "01a06196-4d21-7000-9c3a-2f5b8e1c4a70",
  pageTypeSlug: "module",
  slug: "page-entry-writing",
  definition: "the files a page's entry values are written into",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One value is written as one JSON object on one line.",
    },
    {
      invariantKind: "departure",
      statement: "A row's keys are written in the order the row carries those keys.",
    },
    {
      invariantKind: "departure",
      statement: "Every line closes with a newline.",
    },
    {
      invariantKind: "departure",
      statement: "A property carrying no value is written as one file holding nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A property's values are divided across the numbered files beside the page.",
    },
    {
      invariantKind: "departure",
      statement: "A division is made only where the values run past the ceiling handed in.",
    },
    {
      invariantKind: "departure",
      statement: "No file a division makes runs past that ceiling.",
    },
    {
      invariantKind: "departure",
      statement: "A ceiling is counted in bytes rather than in characters.",
    },
    {
      invariantKind: "departure",
      statement: "One value running past the ceiling alone is refused rather than divided.",
    },
    {
      invariantKind: "departure",
      statement: "The files are named in the order the values were handed over.",
    },
    {
      invariantKind: "departure",
      statement: "What is written here is read back by `page-entries` in the order written.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads or writes the disk.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here mints an id.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges a value against the shape declaring that value.",
    },
  ],
} as const satisfies Module
