import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const contentPagesCacheCore = {
  id: "01a0655d-daa6-7fdf-b1e7-5b58892ba09c",
  pageTypeSlug: "module",
  type: "module",
  slug: "content-pages-cache-core",
  definition: "the shape a held index of content pages is kept in",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A chapter is written through the offline writer and read back here in one test.",
    },
    {
      invariantKind: "departure",
      statement: "That test takes its keys from the writer rather than from a page built to fit.",
    },
    {
      invariantKind: "constraint",
      statement:
        "A writer keeping a page here holds only the keys that writer asked the store for.",
    },
    {
      invariantKind: "departure",
      statement: "`id` is the one key a held page must have.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every other page key is optional here and judged only where a held page has that key.",
    },
    {
      invariantKind: "departure",
      statement: "A key this module names nothing about is handed back to the reader unchanged.",
    },
    {
      invariantKind: "absence",
      statement: "No key that no writer in the repository produces is required of a held page.",
    },
  ],
} as const satisfies Module
