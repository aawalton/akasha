import type { Module } from "../modules/module.page-type.ts"

export const typingKeeping = {
  id: "01a06364-1679-7d55-a520-c4515ba15f89",
  pageTypeSlug: "module",
  slug: "typing-keeping",
  definition: "the version a body is known by, and how a file a program writes lands",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A body is versioned by the hash of the text served.",
    },
    {
      invariantKind: "departure",
      statement: "A file with no text to serve is versioned as nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A file a program writes lands by rename.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here builds a program.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a file the commit carries.",
    },
  ],
} as const satisfies Module
