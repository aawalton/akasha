import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const exportNaming = {
  id: "01a080eb-0604-7716-a9ef-b965f7a766ea",
  type: "module",
  slug: "export-naming",
  definition: "the fault in a page's slug that would leave that page with no export name",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A slug is read from the body of a page rather than from the name of its file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An export name is judged only where a body's file is named for the slug that body states.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A slug that could not become an export name is said with the path that slug sits at.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The remedy names pages already composing a slug the way the fault asks for.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement:
        "A body with a page's text in a template is no page and is judged for no export name.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "An append names no slug.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "An edit appending is judged for no export name.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "An edit bringing a body in states no body, so that edit names no slug.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a file.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes.",
    },
  ],
} as const satisfies Module
