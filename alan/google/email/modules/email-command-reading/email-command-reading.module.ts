import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const emailCommandReading = {
  id: "01a06810-cf11-7676-b503-15195a7cff5b",
  type: "page-type/module",
  slug: "email-command-reading",
  definition: "what an email command reads off its arguments",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "What a call said is handed in, read by the one reader every command reads by.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Text is said at its flag or read from a file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Text said both ways is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file named `-` is the input.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One call reads the input once.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Two flags naming one input are refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Text read whole keeps its line endings and text read as a line loses those line endings.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A subject read from a file has no line ending.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path that is not absolute is read against the repository root.",
    },

    {
      invariantKind: "invariant-kind/absence",
      statement: "No guard is written here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here prints.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reaches Gmail.",
    },
  ],
} as const satisfies Module
