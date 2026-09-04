import type { Module } from "@akasha/code-system/module"

export const pageEntryLanding = {
  id: "01a062a1-8add-7a0c-ad1f-760fd4c73c13",
  pageTypeSlug: "module",
  slug: "page-entry-landing",
  definition: "a page's entry values put on the disk beside that page",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A property's values are written into the files `page-entry-writing` names.",
    },
    {
      invariantKind: "departure",
      statement: "A file that is not there is made rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "A file already holding what would be written is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "Every file the disk changed at is named in the answer.",
    },
    {
      invariantKind: "departure",
      statement: "A file left alone is named nowhere in the answer.",
    },
    {
      invariantKind: "departure",
      statement: "A file numbered past the last file written is taken away.",
    },
    {
      invariantKind: "departure",
      statement: "Appending adds to the last numbered file rather than rewriting that file.",
    },
    {
      invariantKind: "departure",
      statement:
        "An appended value rolls into the next numbered file where the ceiling is reached.",
    },
    {
      invariantKind: "departure",
      statement: "The bytes already in a file count toward the ceiling.",
    },
    {
      invariantKind: "departure",
      statement: "A file's fill is read from that file's size rather than from that file's text.",
    },
    {
      invariantKind: "departure",
      statement: "One value running past the ceiling alone is refused rather than divided.",
    },
    {
      invariantKind: "departure",
      statement:
        "Appending one value at a time divides the files as writing every value at once does.",
    },
    {
      invariantKind: "departure",
      statement: "Writing beside a page that is not there is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names the page or the file the refusal is about.",
    },
    {
      invariantKind: "departure",
      statement: "What is written here is read back by `page-entries` in the order written.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here makes a directory.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here mints an id.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges a value against the shape declaring that value.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the index.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here commits.",
    },
    {
      invariantKind: "gap",
      statement: "Nothing here holds a lock against another writer of the same file.",
    },
  ],
} as const satisfies Module
