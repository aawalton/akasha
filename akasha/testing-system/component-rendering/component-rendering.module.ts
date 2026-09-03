import type { Module } from "@akasha/code-system/module"

export const componentRendering = {
  id: "01a06600-1c40-7000-9d21-4f7a2b6e5c83",
  pageTypeSlug: "module",
  slug: "component-rendering",
  definition: "putting a component into the document a test put up and reading what it drew",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A test imports this rather than the runner preloading it.",
    },
    {
      invariantKind: "departure",
      statement: "A render calls the testing library and passes its result back whole.",
    },
    {
      invariantKind: "departure",
      statement: "The document a render reaches was put up by the registrar beforehand.",
    },
    {
      invariantKind: "departure",
      statement: "Putting the document up and taking it away belongs to the registrar.",
    },
  ],
} as const satisfies Module
