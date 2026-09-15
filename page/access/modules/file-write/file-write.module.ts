import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const fileWrite = {
  id: "01a05bd6-c531-7a9e-9505-89164f47be5f",
  type: "module",
  slug: "file-write",
  definition: "a file-backed page created, patched, removed or upserted",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every write here is handed to `@akasha/page-service`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page is addressed by its slug rather than by a path a caller works out.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A `where` is answered by the service.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The slugs that answer names are the pages written.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A patch writes the stated keys over the keys the page already has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key the page type declares no property for refuses the write.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A write may hand over the body of a file a page's property is held in.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No condition is dropped from a narrow.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A condition the service runs no test for refuses the write.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A write naming a single page refuses where several match.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A create states its slug among its values or is handed a slug as a name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An upsert takes the slug its own `where` looked for.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page is taken away at the path the service reports for its slug.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The writer a write names is read from the name the caller states or from the seat.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A writer is named as a name and an address.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A JSON patch is refused for a page kept as a file.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads the properties a page type declares.",
    },
  ],
} as const satisfies Module
