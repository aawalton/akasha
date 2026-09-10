import type { Module } from "../modules/module.page-type.types.ts"

export const codeNaming = {
  id: "01a08cc7-f1c9-7e9b-9ff6-01abb5cea0cc",
  pageTypeSlug: "module",
  type: "module",
  slug: "code-naming",
  definition: "what the checker says a spelling means",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A spelling is matched by the declaration the checker resolves the spelling to.",
    },
    {
      invariantKind: "departure",
      statement: "Two properties with one key are told apart by where each property is declared.",
    },
    {
      invariantKind: "departure",
      statement:
        "A key stated in an object literal is resolved through the type that literal satisfies.",
    },
    {
      invariantKind: "departure",
      statement:
        "A key taken apart in a binding is resolved through the type the key is taken from.",
    },
    {
      invariantKind: "departure",
      statement: "A key one part of a union alone declares is resolved through that part.",
    },
    {
      invariantKind: "departure",
      statement: "A key more than one part of a union declares apart is resolved through no part.",
    },
    {
      invariantKind: "departure",
      statement: "Where a key one file spells resolves is answered beside a shorthand's names.",
    },
    {
      invariantKind: "departure",
      statement: "A shorthand names the key and the value.",
    },
    {
      invariantKind: "departure",
      statement: "A file is read for every place the file spells one key.",
    },
    {
      invariantKind: "departure",
      statement:
        "A shorthand's names are answered as the declarations the checker resolves that shorthand to.",
    },
    {
      invariantKind: "departure",
      statement: "Respelling a shorthand states the value that shorthand represented.",
    },
    {
      invariantKind: "departure",
      statement: "A key reached by a string keeps its quotes when respelled.",
    },
    {
      invariantKind: "departure",
      statement:
        "A name is found where its own file exports the name rather than where a body spells the name.",
    },
    {
      invariantKind: "departure",
      statement:
        "A name imported under another name is found where that name is imported rather than where used.",
    },
    {
      invariantKind: "departure",
      statement:
        "A name a file keeps to itself is found wherever in that file that name is declared.",
    },
    {
      invariantKind: "departure",
      statement:
        "Where a declaration's name starts is answered as a line counted from the first line.",
    },
    {
      invariantKind: "departure",
      statement:
        "The declarations a name reaches from a place are answered from the scopes over that place.",
    },
    {
      invariantKind: "departure",
      statement: "A name shadowing an imported name inside a scope is left as that name is.",
    },
    {
      invariantKind: "departure",
      statement:
        "Renaming a binding a shorthand represented states that binding rather than the key.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges the answers this module finds.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here builds the program the checker reads.",
    },
  ],
} as const satisfies Module
