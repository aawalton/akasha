import type { Module } from "@akasha/code-system/module"

export const emailCommandReading = {
  id: "01a06810-cf11-7676-b503-15195a7cff5b",
  pageTypeSlug: "module",
  slug: "email-command-reading",
  definition: "what an email command reads off its arguments, and the shape it answers in",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "What a command takes is handed in rather than spelled here.",
    },
    {
      invariantKind: "departure",
      statement: "A flag the command does not take is refused rather than passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A flag whose value is another flag is a flag no value follows.",
    },
    {
      invariantKind: "departure",
      statement: "A word standing alone fills the flag the command names for it.",
    },
    {
      invariantKind: "departure",
      statement: "What is said both as a word and at its flag is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A repeating flag gathers its values in the order the values are said.",
    },
    {
      invariantKind: "departure",
      statement: "A flag that does not repeat is refused where it is said twice.",
    },
    {
      invariantKind: "departure",
      statement:
        "Text is said at its flag or read from a file, and saying it both ways is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A file named `-` is the input.",
    },
    {
      invariantKind: "departure",
      statement: "One call reads the input once, so two flags naming it are refused.",
    },
    {
      invariantKind: "departure",
      statement: "Text read whole keeps its line endings and text read as a line loses them.",
    },
    {
      invariantKind: "departure",
      statement: "A path that is not absolute is read against the repository root.",
    },
    {
      invariantKind: "departure",
      statement: "Every refusal a call earns is gathered rather than the first alone.",
    },
    {
      invariantKind: "departure",
      statement: "What a command answers is JSON, one report line for each line of it.",
    },
    {
      invariantKind: "departure",
      statement: "A fault thrown at Gmail is answered as operational.",
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
