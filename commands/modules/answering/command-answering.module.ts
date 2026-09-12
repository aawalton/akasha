import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const commandAnswering = {
  id: "01a07c6e-41a7-7d0a-8e45-27f5fb2e74f2",
  type: "module",
  slug: "command-answering",
  definition: "the answer a command hands back, and the code that answer has",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A refusal is the caller's mistake unless the caller names another code.",
    },
    {
      invariantKind: "departure",
      statement: "A value answered as JSON is one line of JSON.",
    },
    {
      invariantKind: "departure",
      statement: "A fault with a code of its own is answered with that code.",
    },
    {
      invariantKind: "departure",
      statement: "A fault with no code of its own is answered as operational.",
    },
    {
      invariantKind: "departure",
      statement: "A fault is answered as its message and where that fault was thrown.",
    },
    {
      invariantKind: "departure",
      statement: "A fault carrying no frame is answered as its message alone.",
    },
    {
      invariantKind: "departure",
      statement: "Work is handed a list to name each thing on as that thing is done.",
    },
    {
      invariantKind: "departure",
      statement:
        "A fault is answered with what that list holds, reported and named in the refusal.",
    },
    {
      invariantKind: "departure",
      statement: "A fault with nothing on that list is answered as the fault alone.",
    },
    {
      invariantKind: "departure",
      statement: "An answer refusing after a write names what was written beside that refusal.",
    },
    {
      invariantKind: "departure",
      statement: "An answer refusing with nothing written is left as that answer was.",
    },
    {
      invariantKind: "departure",
      statement: "An answer refusing nothing is left as that answer was, whatever was written.",
    },
    {
      invariantKind: "departure",
      statement:
        "The sentence naming what that list holds is built here for every refusal to reach.",
    },
    {
      invariantKind: "departure",
      statement: "A word where a command takes flags alone is the caller's mistake.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here prints.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the words a command was called with.",
    },
    {
      invariantKind: "departure",
      statement: "A fault thrown outside every command is answered as unclassified.",
    },
    {
      invariantKind: "departure",
      statement: "Such a refusal opens with the name the call was made by.",
    },
  ],
} as const satisfies Module
