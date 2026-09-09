import type { Module } from "@akasha/code/module"

export const commandFlags = {
  id: "01a07bb2-16af-7ede-bbeb-aa80a15e03e1",
  pageTypeSlug: "module",
  type: "module",
  slug: "command-flags",
  definition: "the values a command line has for the flags a command takes",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A flag's value is the argument after that flag.",
    },
    {
      invariantKind: "departure",
      statement: "A flag given more than once answers with every value that flag was given.",
    },
    {
      invariantKind: "departure",
      statement: "A flag nothing follows answers with a value that is not there.",
    },
    {
      invariantKind: "departure",
      statement: "A flag nothing follows is told apart from a flag no call gave.",
    },
    {
      invariantKind: "departure",
      statement: "The value of one flag is never read as another flag.",
    },
    {
      invariantKind: "departure",
      statement:
        "The flags a command takes are handed in rather than read from the command's page.",
    },
    {
      invariantKind: "departure",
      statement: "A flag the caller handed in no spelling for is refused rather than passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A message is read from the command line or from a file.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming the message and the file the message is read from is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A message is answered with the space at either end taken off.",
    },
    {
      invariantKind: "departure",
      statement: "A message that is empty once trimmed is refused.",
    },
    {
      invariantKind: "departure",
      statement: "One call bypasses the checks once.",
    },
    {
      invariantKind: "departure",
      statement: "A reason that is empty once trimmed is refused.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here acts on a value read.",
    },
  ],
} as const satisfies Module
