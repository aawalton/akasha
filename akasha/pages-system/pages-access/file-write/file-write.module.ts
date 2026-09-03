import type { Module } from "@akasha/code-system/module"

export const fileWrite = {
  id: "01a05bd6-c531-7a9e-9505-89164f47be5f",
  pageTypeSlug: "module",
  slug: "file-write",
  definition: "a file-backed page created, patched, removed or upserted",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every write here is handed to `@akasha/pages-system-service`.",
    },
    {
      invariantKind: "departure",
      statement: "A page is addressed by its slug rather than by a path a caller works out.",
    },
    {
      invariantKind: "departure",
      statement:
        "A `where` is answered by the service, and the slugs it names are what is written.",
    },
    {
      invariantKind: "departure",
      statement: "A patch writes the stated keys over the keys the page already carries.",
    },
    {
      invariantKind: "departure",
      statement: "A key the page type declares no property for refuses the write.",
    },
    {
      invariantKind: "absence",
      statement: "No condition is dropped from a narrow.",
    },
    {
      invariantKind: "departure",
      statement: "A condition the service runs no test for refuses the write.",
    },
    {
      invariantKind: "departure",
      statement: "A write naming at most one page refuses where several match.",
    },
    {
      invariantKind: "departure",
      statement: "A create states its slug among its values or is handed one as a name.",
    },
    {
      invariantKind: "departure",
      statement: "An upsert takes the slug its own `where` looked for.",
    },
    {
      invariantKind: "departure",
      statement: "A page is taken away at the path the service reports for its slug.",
    },
    {
      invariantKind: "departure",
      statement: "The writer a write names is read from what the caller states or from the seat.",
    },
    {
      invariantKind: "departure",
      statement: "A writer is named as a name and an address.",
    },
    {
      invariantKind: "departure",
      statement: "A JSON patch is refused for a page kept as a file.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads what a page type declares.",
    },
  ],
} as const satisfies Module
