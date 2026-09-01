import type { Module } from "../module/module.page-type.ts"

export const codeTyping = {
  id: "01a058ec-4a71-7000-9c3e-6b1f0a2d4e55",
  pageTypeSlug: "module",
  slug: "code-typing",
  definition: "a program built over the pages, and what the checker says a spelling means",
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
      statement: "A file the akasha folder compiles is named `.ts` or `.tsx`.",
    },
    {
      invariantKind: "departure",
      statement: "The akasha folder compiles TypeScript written with JSX.",
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
      invariantKind: "departure",
      statement:
        "A name is found where its own file exports it rather than where a body spells it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A name imported under another is found where it is imported rather than where it is used.",
    },
    {
      invariantKind: "departure",
      statement: "A name a file keeps to itself is found wherever in that file it is declared.",
    },
    {
      invariantKind: "departure",
      statement: "Where a declaration's name starts is answered as a line counted from one.",
    },
    {
      invariantKind: "departure",
      statement: "What a name reaches from a place is answered from the scopes over that place.",
    },
    {
      invariantKind: "departure",
      statement: "A name shadowing an imported one inside a scope is left as it stands.",
    },
    {
      invariantKind: "departure",
      statement:
        "Renaming a binding a shorthand stood for states that binding rather than the key.",
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
