import type { Module } from "../../code-system/module/module.page-type.ts"

export const shellCalls = {
  id: "01a04eab-4522-7000-9e89-8627b48fbcc5",
  pageTypeSlug: "module",
  slug: "shell-calls",
  definition: "a shell command line cut into the segments and words it carries",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A line continuation is joined before the line is cut.",
    },
    {
      invariantKind: "departure",
      statement: "A quoted run holding one bare word is unquoted before the cut.",
    },
    {
      invariantKind: "departure",
      statement: "Every other quoted run is taken out before the cut.",
    },
    {
      invariantKind: "departure",
      statement: "A newline cuts as a separator does, and so does every separator form.",
    },
    {
      invariantKind: "departure",
      statement: "An empty segment is dropped, and leading space is taken off the ones kept.",
    },
    {
      invariantKind: "departure",
      statement: "A word is matched by its basename.",
    },
    {
      invariantKind: "absence",
      statement: "The text is cut here, never read for what it means.",
    },
    {
      invariantKind: "absence",
      statement: "No tool is named here.",
    },
    {
      invariantKind: "constraint",
      statement: "This reads a shell command line without being a shell.",
    },
    {
      invariantKind: "gap",
      statement: "Two hooks cut a command line the same way without saying how twice.",
    },
  ],
} as const satisfies Module
