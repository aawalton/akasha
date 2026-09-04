import type { Module } from "../modules/module.page-type.ts"

export const typingKeeping = {
  id: "01a06364-1679-7d55-a520-c4515ba15f89",
  pageTypeSlug: "module",
  slug: "typing-keeping",
  definition: "what a typed program keeps between runs, and the version a body is known by",
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
      statement: "What a run keeps is named for the worktree the program was built over.",
    },
    {
      invariantKind: "departure",
      statement: "What a run keeps is the one file the workspace page declares.",
    },
    {
      invariantKind: "departure",
      statement: "A name carrying how many roots a run had would collide across unlike programs.",
    },
    {
      invariantKind: "departure",
      statement: "What a run keeps lands by rename.",
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
