import type { Module } from "@akasha/code-system/module"

export const keyRespelling = {
  id: "01a058ec-4a71-7001-b7d2-3f9a1c6e80b4",
  pageTypeSlug: "module",
  slug: "key-respelling",
  definition: "the key a page property is read by changed wherever the checker resolves to it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A property is named by its own address rather than by the key the property carries.",
    },
    {
      invariantKind: "departure",
      statement: "A key is carried by more than one property.",
    },
    {
      invariantKind: "departure",
      statement: "A key names no property on its own.",
    },
    {
      invariantKind: "departure",
      statement: "The slug a property is reached by does not change when its key does.",
    },
    {
      invariantKind: "departure",
      statement: "A declaration states the slug rather than the key.",
    },
    {
      invariantKind: "departure",
      statement: "No declaration moves when a key changes.",
    },
    {
      invariantKind: "departure",
      statement:
        "The places the key is spelled are read from the checker rather than matched as text.",
    },
    {
      invariantKind: "departure",
      statement: "The program is built over every path the index names.",
    },
    {
      invariantKind: "departure",
      statement: "A type declaring the key at no signature is refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page stating the key that the index does not name as carrying the key is refused.",
    },
    {
      invariantKind: "departure",
      statement: "What the index answers and what the checker finds hold each other to account.",
    },
    {
      invariantKind: "departure",
      statement: "The property's own page states the key the property becomes.",
    },
    {
      invariantKind: "absence",
      statement: "No file is carried and no path changes.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here lands what this module works out.",
    },
  ],
} as const satisfies Module
