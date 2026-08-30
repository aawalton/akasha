import type { ContextWarrant } from "../context-warrant.page-type.ts"

export const filePageType = {
  id: "01a04f58-a7f0-7001-8b6e-2d51f0a9c344",
  pageTypeSlug: "context-warrant",
  slug: "file-page-type",
  definition: "what a seat must read for the type of the page it changes",
  code: "ts",
  test: "ts",
  runsOnRead: true,
  runsOnWrite: true,
  transitive: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page answers to its type and to every type that one extends.",
    },
    {
      invariantKind: "departure",
      statement: "What a page is held to is read before the page is changed.",
    },
    {
      invariantKind: "departure",
      statement:
        "Only a page answers to a type. A file standing beside a page by a file property is no page and warrants no type of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A type whose page cannot be found is no warrant.",
    },
    {
      invariantKind: "departure",
      statement: "The chain above it is walked all the same.",
    },
    {
      invariantKind: "departure",
      statement: "A chain that turns back on itself is walked once.",
    },
  ],
} as const satisfies ContextWarrant
