import type { Module } from "@akasha/code-system/module"

export const serviceWrapping = {
  id: "01a05a5e-4f47-7632-b967-31167f361530",
  pageTypeSlug: "module",
  slug: "service-wrapping",
  definition: "a service run under a watch that ends it when what it reaches changes",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The wrapper starts nothing again.",
    },
    {
      invariantKind: "departure",
      statement:
        "The wrapper ends its child and leaves on the exit systemd starts the service again for.",
    },
    {
      invariantKind: "departure",
      statement: "A child that will not end on a term is ended outright ten seconds later.",
    },
    {
      invariantKind: "departure",
      statement: "A signal reaching the wrapper reaches its child.",
    },
    {
      invariantKind: "departure",
      statement: "A wrapper signalled to stop leaves on its child's own exit rather than on 79.",
    },
    {
      invariantKind: "departure",
      statement:
        "The wrapper follows what the wrapper reaches itself as well as what its service reaches.",
    },
    {
      invariantKind: "departure",
      statement: "The command is what stands after the first double dash.",
    },
    {
      invariantKind: "departure",
      statement: "The file followed is the first the command names ending in `.ts`.",
    },
    {
      invariantKind: "departure",
      statement: "A command naming no such file is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The repository the wrapper runs in is read from the environment its unit states.",
    },
    {
      invariantKind: "departure",
      statement: "A code file the service reaches that does not parse is waited on for a minute.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file that is not code is waited on by nothing even where that file will not parse.",
    },
    {
      invariantKind: "departure",
      statement: "A code file still not parsing past that minute is run on as it is.",
    },
    {
      invariantKind: "departure",
      statement: "Running this module's file wraps a command.",
    },
    {
      invariantKind: "absence",
      statement: "Importing this module's file runs nothing.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a page.",
    },
    {
      invariantKind: "absence",
      statement: "A file named by a page rather than reached by an import is followed by nothing.",
    },
  ],
} as const satisfies Module
