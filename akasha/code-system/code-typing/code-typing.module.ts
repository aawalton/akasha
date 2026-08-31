import type { Module } from "../module/module.page-type.ts"

export const codeTyping = {
  id: "01a058ec-4a71-7000-9c3e-6b1f0a2d4e55",
  pageTypeSlug: "module",
  slug: "code-typing",
  definition: "a program built over the corpus, and what the checker says a spelling means",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The settings the akasha folder compiles under are said here alone.",
    },
    {
      invariantKind: "departure",
      statement: "The program reads every body through one reader handed to it.",
    },
    {
      invariantKind: "departure",
      statement: "A file outside the akasha folder is read as it stands.",
    },
    {
      invariantKind: "departure",
      statement: "A spelling is matched by the declaration the checker resolves it to.",
    },
    {
      invariantKind: "departure",
      statement: "Two properties carrying one key are told apart by where each is declared.",
    },
    {
      invariantKind: "departure",
      statement:
        "A key stated in an object literal is resolved through the type that literal satisfies.",
    },
    {
      invariantKind: "departure",
      statement: "A key taken apart in a binding is resolved through the type it is taken from.",
    },
    {
      invariantKind: "departure",
      statement: "A shorthand names the key and the value at once.",
    },
    {
      invariantKind: "departure",
      statement: "Respelling a shorthand states the value it stood for.",
    },
    {
      invariantKind: "departure",
      statement: "A key reached by a string keeps its quotes when respelled.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges what it finds.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes.",
    },
  ],
} as const satisfies Module
