import type { Module } from "@akasha/code-system/module"

export const pageMeasuring = {
  id: "01a06d1e-b1fe-7d25-9a68-a0176409c125",
  pageTypeSlug: "module",
  slug: "page-measuring",
  definition:
    "how many pages and property files each page type holds, and how many lines each runs to",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A file is a page or a property of a page as the page file name says.",
    },
    {
      invariantKind: "departure",
      statement: "A page type is the second part of a file name.",
    },
    {
      invariantKind: "departure",
      statement: "A file naming a page type nothing declares is counted under no page type.",
    },
    {
      invariantKind: "departure",
      statement: "A page and the properties beside that page are counted under one page type.",
    },
    {
      invariantKind: "departure",
      statement: "A property is counted under the page type its name carries.",
    },
    {
      invariantKind: "departure",
      statement: "A secret beside a page is no property.",
    },
    {
      invariantKind: "departure",
      statement: "A file that is neither a page nor a property is counted under the total alone.",
    },
    {
      invariantKind: "departure",
      statement: "A generated file is not counted.",
    },
    {
      invariantKind: "departure",
      statement:
        "Page types are ordered by the lines a page type holds in its pages and its properties together.",
    },
    {
      invariantKind: "departure",
      statement: "A file that could not be read is counted with no lines.",
    },
    {
      invariantKind: "departure",
      statement: "A file that could not be read is named under the total.",
    },
    {
      invariantKind: "departure",
      statement: "What page types there are is read from the index rather than from the names met.",
    },
    {
      invariantKind: "departure",
      statement: "A checkout holding no index throws rather than counting no page.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes.",
    },
  ],
} as const satisfies Module
