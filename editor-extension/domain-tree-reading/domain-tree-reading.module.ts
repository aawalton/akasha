import type { Module } from "../../code-system/modules/module.page-type.ts"

export const domainTreeReading = {
  id: "01a06867-dbcb-7956-a5a6-01ace3eca2d4",
  pageTypeSlug: "module",
  slug: "domain-tree-reading",
  definition: "the domain tree asked of the harness and the answer read back into rows",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The tree is asked as a child process because composing it opens page bodies and only bun loads one.",
    },
    {
      invariantKind: "departure",
      statement: "What the command said is handed back as bytes before anything is parsed.",
    },
    {
      invariantKind: "constraint",
      statement: "An answer that is no JSON object is refused as naming no domain at all.",
    },
    {
      invariantKind: "constraint",
      statement: "An answer naming no checkout is refused, since no path could be joined to it.",
    },
    {
      invariantKind: "constraint",
      statement: "A row carrying no slug is refused rather than drawn as a nameless domain.",
    },
    {
      invariantKind: "constraint",
      statement: "A row carrying no path is refused, since nothing could be opened for it.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names the place in the answer the bad row stood at.",
    },
    {
      invariantKind: "departure",
      statement: "A persona or a position that is no string or number is read as none.",
    },
    {
      invariantKind: "departure",
      statement: "An answer naming no unreached domain is read as reaching every domain.",
    },
    {
      invariantKind: "departure",
      statement: "A row's document is the checkout joined to the path that row carries.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here composes the tree the command answers with.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here draws a row.",
    },
  ],
} as const satisfies Module
