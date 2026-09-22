import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const codeNaming = {
  id: "01a08cc7-f1c9-7e9b-9ff6-01abb5cea0cc",
  type: "page-type/module",
  slug: "code-naming",
  definition: "what the checker says a spelling means",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A spelling is matched by the declaration the checker resolves the spelling to.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two properties with one key are told apart by where each property is declared.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A key stated in an object literal is resolved through the type that literal satisfies.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A key taken apart in a binding is resolved through the type the key is taken from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key one part of a union alone declares is resolved through that part.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key more than one part of a union declares apart is resolved through no part.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Respelling a shorthand states the value that shorthand represented.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key reached by a string keeps its quotes when respelled.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A name is found where its own file exports the name rather than where a body spells the name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A name imported under another name is found where that name is imported rather than where used.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A name a file keeps to itself is found wherever in that file that name is declared.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Where a declaration's name starts is answered as a line counted from the first line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The declarations a name reaches from a place are answered from the scopes over that place.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name shadowing an imported name inside a scope is left as that name is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Renaming a binding a shorthand represented states that binding rather than the key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name declared in a declaration file is found there as a name in any body is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A table is the global table where one part of its type is globalThis.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key on the global table spelled as a global is that global.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A key a checker resolves through an index signature is named by no symbol.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key on the global table is found whether it is reached by a name or a string.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here judges the answers this module finds.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here builds the program the checker reads.",
    },
  ],
} as const satisfies Module
