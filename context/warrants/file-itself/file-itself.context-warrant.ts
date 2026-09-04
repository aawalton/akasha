import type { ContextWarrant } from "../context-warrant.page-type.ts"

export const fileItself = {
  id: "01a04f58-a7f0-7000-9d3a-6a0f2c4b81d7",
  pageTypeSlug: "context-warrant",
  slug: "file-itself",
  definition: "what a seat must read for the file it changes",
  code: "ts",
  test: "ts",
  runsOnRead: true,
  runsOnWrite: true,
  transitive: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A file warrants itself.",
    },
    {
      invariantKind: "departure",
      statement: "A file not yet standing warrants nothing of itself.",
    },
    {
      invariantKind: "departure",
      statement: "A file a machine writes warrants nothing of itself.",
    },
    {
      invariantKind: "departure",
      statement: "Which files a machine writes is read from the properties naming them.",
    },
    {
      invariantKind: "departure",
      statement: "A property reaches the folder of a page carrying that property.",
    },
    {
      invariantKind: "departure",
      statement: "A file of that name in another folder warrants itself.",
    },
    {
      invariantKind: "departure",
      statement: "An index that cannot answer leaves every file warranting itself.",
    },
    {
      invariantKind: "departure",
      statement: "Whatever else warrants the file stands unchanged.",
    },
    {
      invariantKind: "departure",
      statement: "The body warranted is the body standing on disk and the body a read records.",
    },
  ],
} as const satisfies ContextWarrant
