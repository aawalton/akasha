import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageReferenceReading = {
  id: "01a0a2f5-8283-7825-bfc3-faab9dc94d51",
  type: "module",
  slug: "page-reference-reading",
  definition: "what references a page, read from the file beside that page",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "What references a page is read from the file beside that page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page asked about by id is reached through the identity index.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The page a file belongs to is asked of the index rather than read from its name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page's references are read once for one reading and held.",
    },

    {
      invariantKind: "invariant-kind/departure",
      statement: "An answer comes back in one order.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reading that answers nothing at all answers none rather than refusing.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A file that is missing reads as a page nothing references.",
    },
  ],
} as const satisfies Module
