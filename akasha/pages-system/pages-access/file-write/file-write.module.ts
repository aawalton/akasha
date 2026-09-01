import type { Module } from "@akasha/code-system/module"

export const fileWrite = {
  id: "01a05bd6-c531-7a9e-9505-89164f47be5f",
  pageTypeSlug: "module",
  slug: "file-write",
  definition: "a file-backed page created, patched, removed or upserted",
  code: "ts",
  invariants: [
    {
      invariantKind: "gap",
      statement: "Every write here refuses and puts nothing in a file.",
    },
    {
      invariantKind: "absence",
      statement: "`@akasha/pages-system-service` reports no path for a row.",
    },
    {
      invariantKind: "absence",
      statement: "A `where` reaches no file name.",
    },
    {
      invariantKind: "departure",
      statement:
        "A refusal names `@akasha/pages-system-service` as what writes a page by its slug.",
    },
    {
      invariantKind: "departure",
      statement: "The writer a write names is read from what the caller states or from the seat.",
    },
    {
      invariantKind: "departure",
      statement: "A JSON patch is refused for a page kept as a file.",
    },
  ],
} as const satisfies Module
