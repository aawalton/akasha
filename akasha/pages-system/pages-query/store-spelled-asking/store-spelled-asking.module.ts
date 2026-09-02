import type { Module } from "@akasha/code-system/module"

export const storeSpelledAsking = {
  id: "01a063ba-dbcd-72dd-9475-fbcddbebcd88",
  pageTypeSlug: "module",
  slug: "store-spelled-asking",
  definition: "a composed query asked of the store in the spelling the store holds",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A caller asking here spells the key its page type declares.",
    },
    {
      invariantKind: "departure",
      statement: "A caller asking the plain composed query spells the key the store holds.",
    },
    {
      invariantKind: "departure",
      statement: "A multi-word key asked the plain way is unmatched rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "A row narrowed to keys comes back empty where the spelling is dropped.",
    },
    {
      invariantKind: "departure",
      statement: "A browser takes this whole road.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here spells a key itself.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing this road reaches opens a file.",
    },
  ],
} as const satisfies Module
