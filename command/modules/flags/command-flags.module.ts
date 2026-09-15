import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const commandFlags = {
  id: "01a07bb2-16af-7ede-bbeb-aa80a15e03e1",
  type: "module",
  slug: "command-flags",
  definition: "the values a command line has for the flags a command takes",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A flag's value is the argument after that flag.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A flag given more than once answers with every value that flag was given.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A flag nothing follows answers with a value that is not there.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A flag nothing follows is told apart from a flag no call gave.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The value of one flag is never read as another flag.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The flags a command takes are handed in rather than read from the command's page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A flag the caller handed in no spelling for is refused rather than passed over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A flag near a spelling handed in is refused with that spelling pointed at.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That refusal names the call as it was made and every flag that call takes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call handed no spelling at all is refused saying it takes no flag.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A message is read from the command line or from a file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call naming the message and the file the message is read from is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A message is answered with the space at either end taken off.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A message that is empty once trimmed is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One call bypasses the checks once.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reason that is empty once trimmed is refused.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here acts on a value read.",
    },
  ],
} as const satisfies Module
