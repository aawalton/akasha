import type { Module } from "@akasha/code/module"

export const exportNaming = {
  id: "01a080eb-0604-7716-a9ef-b965f7a766ea",
  pageTypeSlug: "module",
  slug: "export-naming",
  definition: "the fault in a page's slug that would leave that page with no export name",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A slug is read from the body of a page rather than from the name of its file.",
    },
    {
      invariantKind: "departure",
      statement:
        "An export name is judged only where a body's file is named for the slug that body states.",
    },
    {
      invariantKind: "departure",
      statement: "A slug that could not become an export name is said, with the path it sits at.",
    },
    {
      invariantKind: "departure",
      statement: "The remedy names pages already composing a slug the way the fault asks for.",
    },
    {
      invariantKind: "absence",
      statement:
        "A body with a page's text in a template is no page and is judged for no export name.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a file.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes.",
    },
  ],
} as const satisfies Module
