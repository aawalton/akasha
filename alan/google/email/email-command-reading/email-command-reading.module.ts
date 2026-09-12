import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const emailCommandReading = {
  id: "01a06810-cf11-7676-b503-15195a7cff5b",
  type: "module",
  slug: "email-command-reading",
  definition: "what an email command reads off its arguments, and the shape it answers in",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "What a call said is handed in, read by the one reader every command reads by.",
    },
    {
      invariantKind: "departure",
      statement: "Text is said at its flag or read from a file.",
    },
    {
      invariantKind: "departure",
      statement: "Text said both ways is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A file named `-` is the input.",
    },
    {
      invariantKind: "departure",
      statement: "One call reads the input once.",
    },
    {
      invariantKind: "departure",
      statement: "Two flags naming one input are refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "Text read whole keeps its line endings and text read as a line loses those line endings.",
    },
    {
      invariantKind: "departure",
      statement: "A subject read from a file has no line ending.",
    },
    {
      invariantKind: "departure",
      statement: "A path that is not absolute is read against the repository root.",
    },
    {
      invariantKind: "departure",
      statement: "A command answers JSON.",
    },
    {
      invariantKind: "departure",
      statement: "One report line answers each line of that JSON.",
    },
    {
      invariantKind: "absence",
      statement: "No guard is written here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here prints.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches Gmail.",
    },
  ],
} as const satisfies Module
